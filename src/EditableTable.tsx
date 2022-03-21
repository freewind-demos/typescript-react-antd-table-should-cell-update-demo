import {Button, Popconfirm, Table} from 'antd';
import React, {FC, useState} from 'react';
import EditableCell from './EditableCell';
import EditableRow from './EditableRow';
import {ColumnType} from 'antd/lib/table/interface';

type Row = {
  key: number;
  name: string;
  age: number;
  address: string;
}

export const EditableTable: FC = () => {
  const [dataSource, setDataSource] = useState([
    {
      key: 0,
      name: 'Edward King 0',
      age: 32,
      address: 'London, Park Lane no. 0',
    },
    {
      key: 1,
      name: 'Edward King 1',
      age: 32,
      address: 'London, Park Lane no. 1',
    },
  ]);

  const columns: (ColumnType<Row> & { editable?: boolean })[] = [
    {
      title: 'name',
      dataIndex: 'name',
      width: '30%',
      editable: true,
    },
    {
      title: 'age',
      dataIndex: 'age',
    },
    {
      title: 'address',
      dataIndex: 'address',
    },
    {
      title: 'operation',
      dataIndex: 'operation',
      render: (text:string, record:Row) =>
        dataSource.length >= 1 ? (
          <Popconfirm title="Sure to delete?" onConfirm={() => handleDelete(record.key)}>
            <a>Delete</a>
          </Popconfirm>
        ) : null,
    },
  ].map(col => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record: Row) => ({
        record,
        editable: col.editable,
        dataIndex: col.dataIndex,
        title: col.title,
        handleSave: handleSave,
      }),
    };
  });


  function handleDelete(key: number): void {
    setDataSource(dataSource => dataSource.filter(item => item.key !== key))
  }

  function handleAdd(): void {
    const count = dataSource.length;
    const newData = {
      key: count,
      name: `Edward King ${count}`,
      age: 32,
      address: `London, Park Lane no. ${count}`,
    };
    setDataSource(dataSource => [...dataSource, newData])
  }

  function handleSave(row: Row) {
    const newData = [...dataSource];
    const index = newData.findIndex(item => row.key === item.key);
    const item = newData[index];
    newData.splice(index, 1, {
      ...item,
      ...row,
    });
    setDataSource(newData)
  }

  const components = {
    body: {
      row: EditableRow,
      cell: EditableCell,
    },
  };

  return (
    <div>
      <Button onClick={handleAdd} type="primary" style={{marginBottom: 16}}>
        Add a row
      </Button>
      <Table
        components={components}
        rowClassName={() => 'editable-row'}
        bordered
        dataSource={dataSource}
        columns={columns}
      />
    </div>
  );
}
