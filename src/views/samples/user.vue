<template>
  <div>
    <Row>
      <Col span="24">
      <Card>
        <p slot="title">
          <Icon type="ios-list"></Icon>
          用户管理
        </p>
        <Button slot="extra" type="success" size="small" @click="userAdd = true" icon="plus-round">新增</Button>
        <Form label-position="right" :label-width="80" inline>
          <FormItem label="关键字">
            <Input v-model="Keywords" placeholder="姓名、电话、Email、QQ、地址"></Input>
          </FormItem>
          <FormItem label="是否启用">
            <Select v-model="EnableStatusString">
                                      <Option v-for="status in resEnable" :key="status.value" :value="status.value">{{ status.name }}</Option> 
                                  </Select>
          </FormItem>
          <Button type="primary" icon="search" @click="searchUser">查询</Button>
        </Form>
        <Table :height="Height" size="small" border :columns="userTitle" :data="userTableData"></Table>
      </Card>
      </Col>
    </Row>
    <!--新增用户-->
    <Modal v-model="userAdd" @on-cancel="addUserCancel" :mask-closable="false" :styles="{top: '10px'}">
      <p slot="header">
        <Icon type="plus"></Icon>
        <span>新增用户信息</span>
      </p>
      <Form label-position="right" :label-width="100" :model="addFrom">
        <FormItem label="用户ID">
          <Input v-model="addFrom.id"></Input>
        </FormItem>
        <FormItem label="用户名称">
          <Input v-model="addFrom.name"></Input>
        </FormItem>
        <FormItem label="手机号">
          <Input v-model="addFrom.phone"></Input>
        </FormItem>
        <FormItem label="邮箱">
          <Input v-model="addFrom.email"></Input>
        </FormItem>
        <FormItem label="QQ">
          <Input v-model="addFrom.qq"></Input>
        </FormItem>
        <FormItem label="部门">
          <Select v-model="addFrom.deptId">
            <Option v-for="AddDeptName in DeptList" :key="AddDeptName.id" :value="AddDeptName.id">{{ AddDeptName.name }}</Option> 
          </Select>
        </FormItem>
        <FormItem label="过期时间">
          <Row>
            <Col span="10">
            <RadioGroup v-model="addFrom.status">
              <Radio label="2">启用</Radio>
              <Radio label="3">禁用</Radio>
            </RadioGroup>
            </Col>
            <Col span="4"> <label>过期时间</label> </Col>
            <Col span="10">
            <DatePicker type="date" placeholder="Select date" v-model="addFrom.expiredTime"></DatePicker>
            </Col>
          </Row>
        </FormItem>
        <FormItem label="地址">
          <Input type="textarea" v-model="addFrom.address"></Input>
        </FormItem>
      </Form>
      <div slot="footer">
        <Button @click="addUser" type="success"><Icon type="checkmark-round"></Icon>确定</Button>
        <Button @click="addUserCancel"><Icon type="close"></Icon>取消</Button>
      </div>
    </Modal>
    <!--修改用户-->
    <Modal v-model="userEdit" @on-cancel="editUserCancel" :mask-closable="false" :styles="{top: '10px'}">
      <p slot="header">
        <Icon type="compose"></Icon>
        <span>修改用户信息</span>
      </p>
      <Form label-position="right" :label-width="100" :model="editFrom">
        <FormItem label="用户ID">
          <Input v-model="editFrom.id" readonly></Input>
        </FormItem>
        <FormItem label="用户名称">
          <Input v-model="editFrom.name"></Input>
        </FormItem>
        <FormItem label="手机号">
          <Input v-model="editFrom.phone"></Input>
        </FormItem>
        <FormItem label="邮箱">
          <Input v-model="editFrom.email"></Input>
        </FormItem>
        <FormItem label="QQ">
          <Input v-model="editFrom.qq"></Input>
        </FormItem>
        <FormItem label="部门">
          <Select v-model="editFrom.deptId">
                        <Option v-for="EditDeptName in DeptList" :key="EditDeptName.id"  :value="EditDeptName.id">{{ EditDeptName.name }}</Option> 
                    </Select>
        </FormItem>
        <FormItem label="是否启用">
          <Row>
            <Col span="10">
            <RadioGroup v-model="editFrom.status">
              <Radio label="2">启用</Radio>
              <Radio label="3">禁用</Radio>
            </RadioGroup>
            </Col>
            <Col span="4" style="text-align: center"> <label>过期时间</label> </Col>
            <Col span="10">
            <DatePicker type="date" placeholder="Select date" v-model="editFrom.expiredTime"></DatePicker>
            </Col>
          </Row>
        </FormItem>
        <FormItem label="地址">
          <Input type="textarea" v-model="editFrom.address"></Input>
        </FormItem>
      </Form>
      <div slot="footer">
        <Button @click="editUser" type="success"><Icon type="checkmark-round"></Icon>确定</Button>
        <Button @click="editUserCancel"><Icon type="close"></Icon>取消</Button>
      </div>
    </Modal>
  </div>
</template>

<script>
  import axios from "axios";
  export default {
    data() {
      return {
        DeptList: [],
        userAdd: false,
        userEdit: false,
        resEnable: [],
        EnableStatusString: "1",
        Keywords: "",
        userTitle: [{
            title: "序号",
            type: "index",
            width: 80,
            align: "center"
          },
          {
            title: "姓名",
            key: "name"
          },
          {
            title: "电话",
            key: "phone"
          },
          {
            title: "电子邮件",
            key: "email"
          },
          {
            title: "QQ",
            key: "qq"
          },
          {
            title: "所属部门",
            key: "deptName"
          },
          {
            title: "地址",
            key: "address"
          },
          {
            title: "过期时间",
            key: "expiredTime"
          },
          {
            title: "是否启用",
            key: "status"
          },
          {
            title: "操作",
            width: 165,
            align: "center",
            render: (h, params) => {
              return h("div", [
                h(
                  "Button", {
                    props: {
                      type: "info",
                      size: "small",
                      icon: "compose"
                    },
                    style: {
                      marginRight: "5px"
                    },
                    on: {
                      click: () => {
                        //点击修改获取用户信息
                        axios
                          .get(
                            "http://localhost:8888/api/user/get/" +
                            params.row.id
                          )
                          .then(res => {
                            if (res.data.data != "") {
                              this.editFrom.id = res.data.data.id;
                              this.editFrom.name = res.data.data.name;
                              this.editFrom.phone = res.data.data.phone;
                              this.editFrom.status = res.data.data.status == "true" ? "2" : "3";
                              this.editFrom.expiredTime =
                                res.data.data.expiredTime;
                              this.editFrom.email = res.data.data.email;
                              this.editFrom.qq = res.data.data.qq;
                              this.editFrom.address = res.data.data.address;
                              this.editFrom.deptId = res.data.data.department.id;
                              this.userEdit = true;
                            } else {
                              this.$Message.error(res.data.msg);
                            }
                          });
                      }
                    }
                  },
                  "修改"
                ),
                h(
                  "Button", {
                    props: {
                      icon: "trash-a",
                      type: "error",
                      size: "small"
                    },
                    on: {
                      click: () => {
                        this.$Modal.confirm({
                          title: "操作提示",
                          content: "<p>您确定要删除这条数据吗？</p>",
                          onOk: () => {
                            axios
                              .delete(
                                "http://localhost:8888/api/user/delete/" +
                                params.row.id
                              )
                              .then(res => {
                                if (res.data.data == null) {
                                  this.$Message.success('操作成功');
                                  this.getUserTableData();
                                } else {
                                  this.$Message.error(res.data.msg);
                                }
                              });
                          },
                          onCancel: () => {}
                        });
                      }
                    }
                  },
                  "删除"
                )
              ]);
            }
          }
        ],
        userTableData: [],
        addFrom: {
          id: "",
          name: "",
          phone: "",
          status: "2",
          expiredTime: "",
          email: "",
          qq: "",
          address: "",
          deptId: "",
        },
        editFrom: {
          id: "",
          name: "",
          phone: "",
          status: "",
          expiredTime: "",
          email: "",
          qq: "",
          address: "",
          deptId: "",
        },
        Height: "",
      };
    },
    methods: {
      searchUser() {
        this.getUserTableData();
      },
      getUserTableData() {
        //计算表格的高度
        this.Height = document.documentElement.clientHeight - 265;
        var userData = {
          status: this.EnableStatusString,
          keywords: this.Keywords
        };
        axios
          .post("http://localhost:8888/api/user/query", userData)
          .then(res => {
            var resUserTableData = res.data.data;
            this.userTableData = []
            for (var i in resUserTableData) {
              var data = {
                id: '',
                name: '',
                phone: '',
                email: '',
                qq: '',
                address: '',
                expiredTime: '',
                status: '',
                deptName: '',
              }
              data.id = resUserTableData[i].id
              data.expiredTime = resUserTableData[i].expiredTime
              data.name = resUserTableData[i].name
              data.phone = resUserTableData[i].phone
              data.email = resUserTableData[i].email
              data.qq = resUserTableData[i].qq
              data.address = resUserTableData[i].address
              data.status = resUserTableData[i].status == "true" ? "启用" : "禁用"
              data.deptName = resUserTableData[i].department.name
              this.userTableData.push(data)
            }
  
          });
      },
      //新增用户
      addUser() {
        if (this.addFrom.id == "") {
          this.$Message.warning('用户ID不能为空');
          return;
        }
        if (this.addFrom.name == "") {
          this.$Message.warning('用户名称不能为空');
          return
        }
        if(this.addFrom.expiredTime == ""){
          this.$Message.warning('过期时间不能为空');
          return
        }
        axios
          .post(
            "http://localhost:8888/api/user/add",
            this.$data.addFrom
          )
          .then(res => {
            if (res.data.data == "" || res.data.data == null) {
              this.$Message.success('操作成功');
              this.addUserCancel();
              this.getUserTableData();
            } else {
              this.$Message.error(res.data.msg);
            }
          });
      },
      //新增用户关闭
      addUserCancel() {
        this.userAdd = false;
        this.addFrom.id = "";
        this.addFrom.name = "";
        this.addFrom.phone = "";
        this.addFrom.expiredTime = "";
        this.addFrom.email = "";
        this.addFrom.qq = "";
        this.addFrom.address = "";
      },
      //获取部门
      getDepartment() {
        axios.post("http://localhost:8888/api/dept/query").then(res => {
          this.DeptList = res.data.data;
          this.addFrom.deptId = this.DeptList[0].id;
        });
      },
      //获取启用禁用状态
      getEnable() {
        axios
          .post(
            "http://localhost:8888/api/user/QueryConditionEnableStatus"
          )
          .then(res => {
            this.resEnable = res.data.data;
          });
      },
      //修改用户
      editUser() {
        if (this.editFrom.id == "") {
          this.$Message.warning('用户ID不能为空');
          return;
        }
        if (this.editFrom.name == "") {
          this.$Message.warning('用户名称不能为空');
          return
        }
        if(this.editFrom.expiredTime == ""){
          this.$Message.warning('过期时间不能为空');
          return
        }
        axios
          .post(
            "http://localhost:8888/api/user/edit",
            this.$data.editFrom
          )
          .then(res => {
            if (res.data.data == "" || res.data.data == null) {
              this.$Message.success('操作成功');
              this.userEdit = false;
              this.getUserTableData();
            } else {
              this.$Message.error(res.data.msg);
            }
          });
      },
      //修改用户关闭
      editUserCancel() {
        this.userEdit = false;
      }
    },
    created() {
      this.getUserTableData();
      this.getDepartment();
      this.getEnable();
    }
  };
</script>

<style>
  .ivu-input[readonly] {
    background-color: rgb(236, 241, 252);
  }
</style>

