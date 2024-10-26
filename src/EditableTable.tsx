import { Button, Table } from 'antd';
import { ColumnType } from 'antd/lib/table/interface';
import React, { FC, useCallback, useMemo, useState } from 'react';
import EditableCell from './EditableCell';

type Row = {
  key: number;
  name: string;
  age: number;
}

export const EditableTable: FC = () => {
  const [dataSource, setDataSource] = useState([
    {
      key: 0,
      name: 'Edward King 0',
      age: 32,
    },
    {
      key: 1,
      name: 'Edward King 1',
      age: 32,
    },
  ]);

  const updateDataSource = useCallback((record: Row) => {
    setDataSource(dataSource => dataSource.map(item => item.key === record.key ? record : item));
  }, [dataSource]);

  const columns: (ColumnType<Row> & { editable?: boolean })[] = useMemo(() => [
    {
      title: 'name',
      render: (_, record: Row) => {
        return <EditableCell value={record.name} onChange={(value) => updateDataSource({ ...record, name: value as string })}></EditableCell>;
      },
      shouldCellUpdate: (record, prevRecord) => {
        return record.name !== prevRecord.name;
      },
    },
    {
      title: 'age',
      render: (_, record: Row) => {
        return <EditableCell value={record.age} onChange={(value) => updateDataSource({ ...record, age: value as number })}></EditableCell>;
      },
      shouldCellUpdate: (record, prevRecord) => {
        console.log("### record.age !== prevRecord.age", record.age !== prevRecord.age, { record, prevRecord });
        return record.age !== prevRecord.age;
      },
    },
  ], []);

  return (
    <div>
      <Table
        bordered
        dataSource={dataSource}
        columns={columns}
      />
      <Button onClick={() => {
        if (dataSource.length === 0) return;
        const newData = JSON.parse(JSON.stringify(dataSource));
        newData[0].age += 1;
        setDataSource(newData);
      }}>
        Modify
      </Button>
      <pre>
        {JSON.stringify(dataSource, null, 2)}
      </pre>
    </div>
  );
}
