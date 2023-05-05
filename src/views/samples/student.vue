<template>
  <div>
    <Row>
        <Form ref="formValidate" :model="formValidate" :label-width="80">
            <Col span="6">
                <FormItem label="入学时间：">
                    <Space size="large" wrap>
                        <DatePicker type="date" placeholder="请选择入学时间"  style="width: 100%" />
                    </Space>    
                </FormItem>
            </Col>
            <Col span="6">
                <FormItem label="班级：">
                    <Select v-model="model"  style="width: 100%" placeholder="请选择班级">
                        <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                    </Select>
                </FormItem>
            </Col>
            <Col span="6">
                <FormItem label="关键字：">
                    <Input v-model="value" placeholder="名字、学号、手机号" style="width: 100%" />    
                </FormItem>
            </Col>
            <Col span="6">
                <FormItem label-width="10">
                    <Button size="large" type="primary" icon="ios-search">查询</Button>
                </FormItem>
            </Col>
        </Form>
    </Row>
    <Row>
        <Table :columns="columns" :data="tableData" border>
            <template #name="{ row, index }">
                <span>{{ row.name }}</span>
            </template> 
            <template #action="{ row, index }">
                <Button type="primary" size="small" style="margin-right: 5px">修改</Button>
                <Button type="error" size="small" >删除</Button>
                <Button type="success" size="small" >成绩</Button>
            </template>
        </Table>
    </Row>
  </div>
</template>

<script>
export default {
data() {
    return{
        formValidate: {},
        cityList: [
            {
                value: 1,
                label: '全部'
            }
        ],
        value: '',
        columns: [
                    {
                        title: '序号',
                        key: 'name'
                    },
                    {
                        title: '学号',
                        key: 'name'
                    },
                    {
                        title: '姓名',
                        key: 'name'
                    },{
                        title: '性别',
                        key: 'name'
                    },
                    {
                        title: '出生年月日',
                        key: 'name'
                    },
                    {
                        title: '入学年份',
                        key: 'name'
                    },
                    {
                        title: '班级',
                        key: 'name'
                    },
                    {
                        title: '手机号',
                        key: 'name'
                    },
                    {
                        title: '家庭住址',
                        key: 'name'
                    },
                    {
                        title: '修改',
                        key: 'name'
                    },
                    {
                        title: '删除',
                        key: 'name'
                    },
                    {
                        title: '成绩',
                        key: 'name'
                    }
        ],
        tableData:[
            {
                name: 'John Brown',
                age: 18,
                address: 'New York No. 1 Lake Park',
                date: '2016-10-03'
            }
        ]
    }
}
}
</script>

<style>

</style> 