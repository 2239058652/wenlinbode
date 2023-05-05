 <style scoped>
.layout {
  border: 1px solid #d7dde4;
  background: #f5f7f9;
  position: relative;
  border-radius: 4px;
  overflow: hidden;
}
.layout-logo {
  width: 100px;
  height: 30px;
  background: #5b6270;
  border-radius: 3px;
  float: left;
  position: relative;
  top: 15px;
  left: 20px;
}
.layout-nav {
  float: right;
  margin: 0 auto; 
}

.menu-icon {
  transition: all 0.3s;
}
.rotate-icon {
  transform: rotate(-90deg);
}
.menu-item span {
  display: inline-block;
  overflow: hidden;
  width: 69px;
  text-overflow: ellipsis;
  white-space: nowrap;
  vertical-align: bottom;
  transition: width 0.2s ease 0.2s;
}
.menu-item i {
  transform: translateX(0px);
  transition: font-size 0.2s ease, transform 0.2s ease;
  vertical-align: middle;
  font-size: 16px;
}
.collapsed-menu span {
  width: 0px;
  transition: width 0.2s ease;
}
.collapsed-menu i {
  transform: translateX(5px);
  transition: font-size 0.2s ease 0.2s, transform 0.2s ease 0.2s;
  vertical-align: middle;
  font-size: 22px;
}
.footer {
  background: #e6e8e9;
  text-align: center;
}
.twoLayout{
  margin-top: 30px; 
}
</style>
<template>
    <div class="layout">
        <Layout>
            <Header>
                <Menu mode="horizontal" theme="dark" active-name="1">
                    <div class="layout-logo"></div>
                    <div class="layout-nav">
                        <MenuItem name="1">
                            <Icon type="ios-navigate"></Icon>
                            Item 1
                        </MenuItem>
                        <MenuItem name="2">
                            <Icon type="ios-keypad"></Icon>
                            Item 2
                        </MenuItem>
                        <MenuItem name="3">
                            <Icon type="ios-analytics"></Icon>
                            Item 3
                        </MenuItem>
                        <MenuItem name="4">
                            <Icon type="ios-paper"></Icon>
                            Item 4
                        </MenuItem>
                    </div>
                </Menu>
            </Header>
            <Layout> 
                <Sider ref="side1"  collapsible :collapsed-width="78" v-model="isCollapsed" hide-trigger :style="{background: '#fff'}">
                    <Menu active-name="1-2" theme="light" width="auto" :class="menuitemClasses">
                        <MenuItem name="1-1">
                            <Icon type="ios-navigate"></Icon>
                            <span>Option 1</span>
                        </MenuItem>
                        <MenuItem name="1-2">
                            <Icon type="search"></Icon>
                            <span>Option 2</span>
                        </MenuItem>
                        <MenuItem name="1-3">
                            <Icon type="settings"></Icon>
                            <span>Option 3</span>
                        </MenuItem> 
                    </Menu>
                </Sider>
                <Layout>
                    <Breadcrumb :style="{background:'#fff'}"> 
                    <Icon @click.native="collapsedSider" :class="rotateIcon" :style="{margin: '10px'}" type="navicon-round" size="24"></Icon> 
                        <BreadcrumbItem>Home</BreadcrumbItem>
                        <BreadcrumbItem>Components</BreadcrumbItem>
                        <BreadcrumbItem>Layout</BreadcrumbItem>
                    </Breadcrumb> 
                    <Content :style="{height:'400px',
                                      margin:'10px 0px 0px 10px',
                                      top: '108px',
                                      overflow: 'auto',
                                      background: '#fff'}">   
                            <p>Content</p>  <p>Content</p>
                            <p>Content</p>  <p>Content</p>
                            <p>Content</p>  <p>Content</p>
                            <p>Content</p>  <p>Content</p>
                            <p>Content</p>  <p>Content</p>
                            <p>Content</p>   <p>Content</p>
                            <p>Content</p>  <p>Content</p>
                            <p>Content</p>  <p>Content</p>
                            <p>Content</p>  <p>Content</p>
                            <p>Content</p>  <p>Content</p>
                            <p>Content</p>  <p>Content</p>
                            <p>Content</p>  <p>Content</p>
                            <p>Content</p>  <p>Content</p>
                            <p>Content</p>  <p>Content</p>
                            <p>Content</p>  <p>Content</p>
                            <p>Content</p>  <p>Content</p>
                            <p>Content</p>  <p>Content</p>
                            <p>Content</p>   <p>Content</p>
                            <p>Content</p>  <p>Content</p>
                            <p>Content</p>  <p>Content</p>
                            <p>Content</p>  <p>Content</p>
                            <p>Content</p>  <p>Content</p>
                            <p>Content</p>  <p>Content</p>
                            <p>Content</p>  <p>Content</p>
                    </Content>
                </Layout>
            </Layout>
            <Footer class="footer">Footer</Footer>
        </Layout>  
    </div>
</template>
<script>
export default {
  name: "main-layout",
  
  data() {
    return {
      isCollapsed: false, 
    };
  },
  computed: {
    rotateIcon() {
      return ["menu-icon", this.isCollapsed ? "rotate-icon" : ""];
    },
    menuitemClasses() {
      return ["menu-item", this.isCollapsed ? "collapsed-menu" : ""];
    }
  },
  methods: {
    collapsedSider() {
      this.$refs.side1.toggleCollapse();
    }, 
  }, 
};
</script>
