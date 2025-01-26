import React, { useState, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { X } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import debounce from 'lodash/debounce';

const AddMemberDialog = ({
  isOpen,
  onClose,
  onAdd,
  availablePeople,
  selectedPerson,
  onSelectPerson,
}) => {
  const [inputValue, setInputValue] = useState('');

  // Para futura integración con API
  const debouncedSearch = useCallback(
    debounce((value) => {
      // Aquí iría la llamada a la API
      console.log('Searching:', value);
    }, 300),
    []
  );

  const handleSearchChange = (value) => {
    setInputValue(value);
    debouncedSearch(value);
  };

  // Filtra las personas basado en el valor del input
  const filteredPeople = inputValue.length >= 1
    ? availablePeople.filter(person =>
        person.name.toLowerCase().includes(inputValue.toLowerCase()) ||
        person.email.toLowerCase().includes(inputValue.toLowerCase())
      )
    : [];

  const shouldShowResults = inputValue.length >= 1;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Añadir personas al grupo</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col space-y-4">
          {!selectedPerson ? (
            <Command className="rounded-lg border shadow-md">
              <CommandInput 
                placeholder="Buscar por nombre, apellido o email" 
                value={inputValue}
                onValueChange={handleSearchChange}
              />
              <CommandList>
                {shouldShowResults && (
                  <>
                    {filteredPeople.length === 0 ? (
                      <CommandEmpty>No se encontraron resultados.</CommandEmpty>
                    ) : (
                      <CommandGroup>
                        {filteredPeople.map((person) => (
                          <CommandItem
                            key={person.id}
                            onSelect={() => {
                              onSelectPerson(person);
                              setInputValue('');
                            }}
                            className="flex items-center space-x-2 p-2"
                          >
                            <Avatar className="h-8 w-8">
                              <AvatarImage src={person.avatarUrl} alt={person.name} />
                              <AvatarFallback>
                                {person.name.split(' ').map(n => n[0]).join('')}
                              </AvatarFallback>
                            </Avatar>
                            <div className="flex flex-col">
                              <span className="text-sm font-medium">{person.name}</span>
                              <span className="text-xs text-slate-500">{person.email}</span>
                            </div>
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    )}
                  </>
                )}
              </CommandList>
            </Command>
          ) : (
            <div className="flex items-center space-x-2 bg-blue-50 p-2 rounded-lg">
              <Avatar className="h-8 w-8">
                <AvatarImage src={selectedPerson.avatarUrl} alt={selectedPerson.name} />
                <AvatarFallback>
                  {selectedPerson.name.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              <span className="text-sm font-medium">{selectedPerson.name}</span>
              <Button
                variant="ghost"
                size="icon"
                className="ml-auto"
                onClick={() => onSelectPerson(null)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          )}
        </div>
        <DialogFooter className="sm:justify-between">
          <Button variant="outline" onClick={onClose}>
            Cancelar
          </Button>
          <Button
            type="submit"
            disabled={!selectedPerson}
            onClick={() => onAdd(selectedPerson)}
          >
            {selectedPerson ? `Añadir ${selectedPerson.name.split(' ')[0]}` : 'Añadir'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddMemberDialog;