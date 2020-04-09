import {Form, Input} from 'antd';
import React, {useContext, useEffect, useRef, useState} from 'react';

interface Item {
  key: string;
  name: string;
  age: string;
  address: string;
}

interface EditableCellProps {
  title: React.ReactNode;
  editable: boolean;
  children: React.ReactNode;
  dataIndex: string;
  record: Item;
  handleSave: (record: Item) => void;
}

const EditableCell: React.FC<EditableCellProps> = (
  {
    title,
    editable,
    children,
    dataIndex,
    record,
    handleSave,
    ...restProps
  }
) => {
  const [editing, setEditing] = useState(false);
  const inputRef = useRef<Input>();
  const form = useContext(EditableContext);

  useEffect(() => {
    if (editing) {
      inputRef.current?.focus();
    }
  }, [editing]);

  const toggleEdit = () => {
    setEditing(!editing);
    form.setFieldsValue({[dataIndex]: record[dataIndex]});
  };

  const save = async e => {
    try {
      const values = await form.validateFields();

      toggleEdit();
      handleSave({...record, ...values});
    } catch (errInfo) {
      console.log('Save failed:', errInfo);
    }
  };

  let childNode = children;

  if (editable) {
    childNode = editing ? (
      <Form.Item
        style={{margin: 0}}
        name={dataIndex}
        rules={[
          {
            required: true,
            message: `${title} is required.`,
          },
        ]}
      >
        <Input ref={inputRef} onPressEnter={save} onBlur={save}/>
      </Form.Item>
    ) : (
      <div className="editable-cell-value-wrap" style={{paddingRight: 24}} onClick={toggleEdit}>
        {children}
      </div>
    );
  }

  return <td {...restProps}>{childNode}</td>;
};

export default EditableCell;
