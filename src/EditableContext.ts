import React from 'react';
import {FormInstance} from 'antd';

const EditableContext = React.createContext<FormInstance>(undefined as any);

export default EditableContext;
