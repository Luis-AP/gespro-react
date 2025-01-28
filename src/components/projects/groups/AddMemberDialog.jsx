import React, { useState, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
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
  searchStudents,
  selectedPerson,
  onSelectPerson,
}) => {
  const [inputValue, setInputValue] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);

  const debouncedSearch = useCallback(
    debounce(async (value) => {
      if (value.length >= 2) {
        setIsSearching(true);
        try {
          const results = await searchStudents(value);
          setSearchResults(results || []);
        } catch (error) {
          console.error('Error searching students:', error);
          setSearchResults([]);
        } finally {
          setIsSearching(false);
        }
      }
    }, 300),
    [searchStudents]
  );

  const handleSearchChange = (value) => {
    setInputValue(value);
    if (value.length < 2) {
      setSearchResults([]);
      setIsSearching(false);
    } else {
      debouncedSearch(value);
    }
  };

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
                {inputValue.length < 2 ? (
                  <CommandEmpty>Ingresa al menos 2 caracteres para buscar</CommandEmpty>
                ) : isSearching ? (
                  <CommandEmpty>Buscando...</CommandEmpty>
                ) : searchResults.length === 0 ? (
                  <CommandEmpty>No se encontraron resultados</CommandEmpty>
                ) : (
                  <CommandGroup>
                    {searchResults.map((person) => (
                      <CommandItem
                        key={person.id}
                        value={`${person.first_name} ${person.last_name}`}
                        onSelect={() => {
                          onSelectPerson(person);
                          setInputValue('');
                          setSearchResults([]);
                        }}
                        className="flex items-center space-x-2 p-2"
                      >
                        <Avatar className="h-8 w-8">
                          <AvatarFallback>
                            {person.first_name[0]}{person.last_name[0]}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex flex-col">
                          <span className="text-sm font-medium">
                            {person.first_name} {person.last_name}
                          </span>
                          <span className="text-xs text-slate-500">{person.email}</span>
                        </div>
                      </CommandItem>
                    ))}
                  </CommandGroup>
                )}
              </CommandList>
            </Command>
          ) : (
            <div className="flex items-center space-x-2 bg-blue-50 p-2 rounded-lg">
              <Avatar className="h-8 w-8">
                <AvatarFallback>
                  {selectedPerson.first_name[0]}{selectedPerson.last_name[0]}
                </AvatarFallback>
              </Avatar>
              <span className="text-sm font-medium">
                {selectedPerson.first_name} {selectedPerson.last_name}
              </span>
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
            {selectedPerson ? `Añadir a ${selectedPerson.first_name}` : 'Añadir'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddMemberDialog;