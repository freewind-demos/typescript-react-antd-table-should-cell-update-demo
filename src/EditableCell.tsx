import { Badge, Input } from 'antd';
import React, { useEffect, useRef, useState } from 'react';

interface EditableCellProps {
  value: string | number;
  onChange: (value: string | number) => void;
}

const EditableCell: React.FC<EditableCellProps> = ({ value, onChange }) => {
  const [editing, setEditing] = useState(false);

  const renderVersion = useRef(0);
  useEffect(() => {
    renderVersion.current += 1;
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  const toggleEdit = () => {
    setEditing(!editing);
  };


  return (
    <Badge count={renderVersion.current} showZero offset={[20, 0]}>
      {editing ? <Input
        value={value}
        onChange={handleChange}
        onPressEnter={toggleEdit}
        onBlur={toggleEdit}
        autoFocus
      /> :
        <div onClick={toggleEdit} style={{ cursor: 'pointer' }}>
          {value}
        </div>
      }
    </Badge>
  );
};

export default EditableCell;
