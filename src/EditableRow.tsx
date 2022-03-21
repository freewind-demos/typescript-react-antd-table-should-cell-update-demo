import {Form} from 'antd';
import React from 'react';
import EditableContext from './EditableContext';
import {useForm} from 'antd/lib/form/Form';

type EditableRowProps = {
  index: number;
}

const EditableRow: React.FC<EditableRowProps> = ({index, ...props}) => {
  const [form] = useForm();
  return (
    <Form form={form} component={false}>
      <EditableContext.Provider value={form}>
        <tr {...props} />
      </EditableContext.Provider>
    </Form>
  );
};

export default EditableRow;
