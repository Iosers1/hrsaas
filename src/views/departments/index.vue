<template>
  <div class="dashboard-container">
    <div class="app-container">
      <el-card class="tree-card">
        <tree-tools :tree-node="company" :is-root="true" />
        <el-tree :data="departs" :props="defaultProps" default-expand-all>
          <tree-tools slot-scope="{ data }" :tree-node="data" />
        </el-tree>
      </el-card>
    </div>
  </div>
</template>
<script>
import treeTools from './components/tree-tools.vue'
import { getDepartments } from '@/api/departments'
import { tranListToTreeData } from '@/utils'
export default {
  components: { treeTools },
  data() {
    return {
      defaultProps: {
        label: 'name' // label默认的值是:'label'
        // children: 'children' //这个可以省略，children默认的就是'children'
      },
      departs: [],
      company: { name: '人力资源后台管理系统', manager: '负责人' }
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
