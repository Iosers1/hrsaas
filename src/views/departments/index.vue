<template>
  <div class="dashboard-container">
    <div class="app-container">
      <el-card class="tree-card">
        <tree-tools :tree-node="company" :is-root="true" />
        <el-tree :data="departs" :props="defaultProps" default-expand-all>
          <tree-tools slot-scope="obj" :tree-node="obj.data" @delDepts="getDepartments" @addDepts="addDepts" />
        </el-tree>
      </el-card>
    </div>
    <add-dept :show-dialog="showDialog" :tree-node="node" />
  </div>
</template>
<script>
import treeTools from './components/tree-tools.vue'
import { getDepartments } from '@/api/departments'
import { tranListToTreeData } from '@/utils'
import AddDept from './components/add-dept' // 引入新增部门组件
export default {
  components: { treeTools, AddDept },
  data() {
    return {
      defaultProps: {
        label: 'name' // label默认的值是:'label'
        // children: 'children' //这个可以省略，children默认的就是'children'
      },
      departs: [],
      company: { name: '人力资源后台管理系统', manager: '负责人' },
      showDialog: false, // 显示窗体
      node: null // 操作的节点
    }
  },
  created() {
    this.getDepartments()
  },
  methods: {
    async getDepartments() {
      const ret = await getDepartments()
      console.log(ret.depts)
      this.departs = tranListToTreeData(ret.depts, '')
    },
    addDepts(node) {
      this.showDialog = true // 显示弹层
      // 因为node是当前的点击的部门， 此时这个部门应该记录下来,
      this.node = node
    }
  }
}
</script>
<style scoped>
.tree-card {
  padding: 30px 140px;
  font-size: 14px;
}
</style>
