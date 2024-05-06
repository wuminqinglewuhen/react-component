
import React, { useEffect, useState } from 'react';
import { Button, Modal, Table, Pagination, Form, Row, Col, Input, Space, Select, message } from 'antd';
import styles from './index.less'


export default function CustomName(props) {
    const [form] = Form.useForm();
    const { getFieldsValue, resetFields } = form
    const { getCustomName, value, requestDataApi } = props
    const [inputValue, setInputValue] = useState(value)
    const [customNameOpen, setCustomNameOpen] = useState(false)
    const [dataSource, setDataSource] = useState([])
    const [total, setTotal] = useState(0)
    const [loading, setLoading] = useState(false)
    const [chargeParams, setChargeParams] = useState({
        params: {},
        page: {
            current: 1,
            pageSize: 200,
        }
    })

    useEffect(() => {
        if (customNameOpen) {
            getChargeList()
        }
    }, [chargeParams, customNameOpen])

    const showTotal = (total) => {
        return `[ TotalCount ${total} ]`
    }
    const handlePageChange = (num, size) => {
        setChargeParams({ ...chargeParams, page: { current: num, pageSize: size } })
    }
    let emptyText = <div className={styles.textLeft}>NO Records found</div>
    const handleSearch = () => {
        const data = getFieldsValue()
        setChargeParams({
            ...chargeParams,
            page: { ...chargeParams.page, current: 1 },
            params: { ...data }
        })
    }
    const handleReset = () => {
        resetFields()
    }
    const getChargeList = async () => {
        if (!requestDataApi) {
            message.error(`requestDataApi必传`)
            return
        }
        setLoading(true)
        const res = await requestDataApi(chargeParams)
        if (res.success) {
            res.data.resultList.forEach(item => {
                item.key = item.customerCode
            })
            setDataSource([...res.data.resultList])
            setTotal(res.data.totalCount)
            setLoading(false)
        }
    }
    const rowSelection = {
        onChange: (selectedRowKeys, selectedRows) => {
            getCustomName && getCustomName(selectedRows[0].customerNameCn) // 选取的值传递到父组件
            setCustomNameOpen(false) //关闭弹窗
        },
    }
    return (
        <>
            <Input.Search allowClear onSearch={() => { setCustomNameOpen(true) }} value={value || inputValue} onChange={(e) => {
                setInputValue(e.target.value)
                getCustomName && getCustomName(e.target.value)
            }}></Input.Search>
            {customNameOpen && <Modal
                title="客户"
                open={customNameOpen}
                width={1000}
                onCancel={() => { setCustomNameOpen(false) }}
                footer={null}
                bodyStyle={{
                    height: 500
                }}
                destroyOnClose={true}>
                <div>
                    <Form
                        form={form}
                        {...formItemLayout}
                        colon={false}
                    >
                        <Row>
                            <Col span={8}>
                                <Form.Item name="customerCode" label="客户IRIS2代码">
                                    <Input />
                                </Form.Item>
                            </Col>
                            <Col span={8}>
                                <Form.Item name="sapId" label="SAP客户代码">
                                    <Input />
                                </Form.Item>
                            </Col>
                            <Col span={8}>
                                <Form.Item name="queryStr" label="综合查询字段">
                                    <Input />
                                </Form.Item>
                            </Col>
                            <Col span={8}>
                                <Form.Item name="customerNameCn" label="客户中文名称">
                                    <Input />
                                </Form.Item>
                            </Col>
                            <Col span={8}>
                                <Form.Item name="customerNameEn" label="客户英文名称">
                                    <Input />
                                </Form.Item>
                            </Col>
                            <Col span={8}>
                                <Form.Item name="type" label="集团">
                                    <Select allowClear options={groupOptions} />
                                </Form.Item>
                            </Col>
                            <Col span={8}>
                                <Form.Item name="city" label="城市名称">
                                    <Input />
                                </Form.Item>
                            </Col>
                        </Row>
                    </Form>
                </div>
                <div className={styles.btn_wrap}>
                    <Space>
                        <Button onClick={handleSearch} className={styles.mrg_right} type="primary">
                            查询
                        </Button>
                        <Button className={styles.mrg_right} type="plain" onClick={handleReset}>
                            重置
                        </Button>
                    </Space>

                </div>
                <div className={styles.pagimation}>
                    <Pagination
                        size={'small'}
                        current={chargeParams.page.current}
                        pageSize={chargeParams.page.pageSize}
                        pageSizeOptions={['200', '300', '500']}
                        defaultPageSize={200}
                        total={total}
                        showTotal={showTotal}
                        onChange={(current, pageSize) => handlePageChange(current, pageSize)}
                        onShowSizeChange={(current, pageSize) => handlePageChange(current, pageSize)}
                    ></Pagination>
                </div>
                <div>
                    <Table
                        key={Math.random()}
                        columns={columns}
                        dataSource={dataSource}
                        loading={loading}
                        bordered
                        locale={{ emptyText, }}
                        pagination={false}
                        scroll={{ x: 1500 }}
                        rowSelection={{
                            type: 'radio',
                            ...rowSelection,
                        }}
                    />
                </div>
            </Modal>}

        </>
    )
}
const columns = [
    { title: '状态', dataIndex: 'statusType', key: 'statusType', width: 80 },
    { title: '客户中文名', dataIndex: 'customerNameCn', key: 'customerNameCn', width: 150, ellipsis: true },
    { title: '客户IRIS2代码', dataIndex: 'customCode', key: 'customCode', width: 150, ellipsis: true },
    { title: 'SAP客户代码', dataIndex: 'sapId', key: 'sapId', width: 150, ellipsis: true },
    { title: '本地结算系统代码', dataIndex: 'localCustomerCode', key: 'localCustomerCode', width: 150, ellipsis: true },
    { title: '本地财务系统代码', dataIndex: 'localFinanceCustomerCode', key: 'localFinanceCustomerCode', width: 150, ellipsis: true },
    { title: '客户英文名称', dataIndex: 'customerNameCn', key: 'customerNameCn', width: 150, ellipsis: true },
    { title: '发票上客户英文名', dataIndex: 'customerNameEn', key: 'customerNameEn', width: 200, ellipsis: true },
    { title: '内外部属性', dataIndex: 'type', key: 'type', width: 120, ellipsis: true },
    { title: '城市名称', dataIndex: 'cityName', key: 'cityName', width: 150, ellipsis: true },
    { title: '联系人', dataIndex: 'contact', key: 'contact', width: 150, ellipsis: true },
    { title: '联系人电子邮件', dataIndex: 'contactEmail', key: 'contactEmail', width: 200, ellipsis: true }
]
const formItemLayout = {
    labelCol: {
        xs: {
            span: 24,
        },
        sm: {
            span: 8,
        },
    },
    wrapperCol: {
        xs: {
            span: 24,
        },
        sm: {
            span: 16,
        },
    },
};
// async function queryCustNameList(params) {
//     return request('/comp/queryCustNameList', {
//         method: 'POST',
//         data: params,
//     });
// }
const groupOptions = [
    { label: '集团内', value: 'In' },
    { label: '集团外', value: 'Out' }
]