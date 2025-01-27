import React from 'react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Trash2 } from 'lucide-react';

const MemberListItem = ({ member, onDelete }) => {
  return (
    <div className="flex items-center justify-between p-2 rounded-lg hover:bg-slate-100">
      <div className="flex items-center space-x-4">
        <Avatar className="h-10 w-10">
          <AvatarImage src={member.avatarUrl} alt={member.name} />
          <AvatarFallback>
          {`${member.first_name[0]}${member.last_name[0]}`}
          </AvatarFallback>
        </Avatar>
        <div>
          <h4 className="text-sm font-medium">{member.first_name} {member.last_name}</h4>
          <p className="text-sm text-slate-500">
            {member.email} • {member.role}
          </p>
        </div>
      </div>
      <Button
        variant="ghost"
        size="icon"
        className="text-slate-500 hover:text-red-600 hover:bg-red-100"
        onClick={() => onDelete(member)}
      >
        <Trash2 className="h-4 w-4" />
      </Button>
    </div>
  );
};

export default MemberListItem;