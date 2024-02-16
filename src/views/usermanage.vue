<template>
	<div>
		<div class="container">
			<div class="handle-box">
				<el-select v-model="query.address" placeholder="权限" class="handle-select mr10">
					<el-option key="1" label="管理员" value="管理员"></el-option>
					<el-option key="2" label="员工" value="员工"></el-option>
					<el-option key="3" label="普通用户" value="普通用户"></el-option>
				</el-select>
				<el-input v-model="query.name" placeholder="用户名" class="handle-input mr10"></el-input>
				<el-button type="primary" :icon="Search" @click="handleSearch">搜索</el-button>
				<el-button type="primary" :icon="Plus" @click="userAddHandleEdit()">新增</el-button>
			</div>
			<el-table :data="tableData" border class="table" ref="multipleTable" header-cell-class-name="table-header">
				<el-table-column prop="id" label="ID" width="55" align="center"></el-table-column>
				<el-table-column prop="name" label="用户名"></el-table-column>
				<!-- <el-table-column label="账户余额">
					<template #default="scope">￥{{ scope.row.money }}</template>
				</el-table-column> -->
				<el-table-column prop="phone" label="手机号"></el-table-column>
				<el-table-column prop="email" label="邮箱"></el-table-column>
				<el-table-column prop="role" label="权限"></el-table-column>
				<el-table-column prop="proLevel" label="职级"></el-table-column>
				<el-table-column prop="date" label="注册时间"></el-table-column>
				<el-table-column label="操作" width="220" align="center">
					<template #default="scope">
						<el-button text :icon="Edit" @click="handleEdit(scope.$index, scope.row)" v-permiss="15">
							编辑
						</el-button>
						<el-button text :icon="Delete" class="red" @click="handleDelete(scope.$index)" v-permiss="16">
							删除
						</el-button>
					</template>
				</el-table-column>
			</el-table>
			<div class="pagination">
				<el-pagination
					background
					layout="total, prev, pager, next"
					:current-page="query.pageIndex"
					:page-size="query.pageSize"
					:total="pageTotal"
					@current-change="handlePageChange"
				></el-pagination>
			</div>
		</div>

		<!-- 编辑弹出框 -->
		<el-dialog title="编辑用户信息" v-model="editVisible" width="30%">
			<el-form label-width="70px">
				<el-form-item label="用户名">
					<el-input v-model="form.name"></el-input>
				</el-form-item>
				<el-form-item label="手机号">
					<el-input v-model="form.phone"></el-input>
				</el-form-item>
				<el-form-item label="邮箱">
					<el-input v-model="form.email"></el-input>
				</el-form-item>
				<el-form-item label="职级">
					<el-select v-model="form.proLevel" class="m-2" placeholder="Select" size="large">
						<el-option
							v-for="item in proLevel_options"
							:key="item.value"
							:label="item.label"
							:value="item.value"
						/>
					</el-select>
				</el-form-item>
				<el-form-item label="权限">
					<el-select v-model="form.role" class="m-2" placeholder="Select" size="large">
						<el-option
							v-for="item in role_options"
							:key="item.value"
							:label="item.label"
							:value="item.value"
						/>
					</el-select>
				</el-form-item>
			</el-form>
			<template #footer>
				<span class="dialog-footer">
					<el-button @click="editVisible = false">取 消</el-button>
					<el-button type="primary" @click="saveEdit">确 定</el-button>
				</span>
			</template>
		</el-dialog>

		<!-- 添加用户弹出框 -->
		<el-dialog title="添加新用户" v-model="addUserVisible" width="30%">
			<el-form label-width="70px">
				<el-form-item label="用户名">
					<el-input v-model="adduser_form.name"></el-input>
				</el-form-item>
				<el-form-item label="手机号">
					<el-input v-model="adduser_form.phone"></el-input>
				</el-form-item>
				<el-form-item label="邮箱">
					<el-input v-model="adduser_form.email"></el-input>
				</el-form-item>
				<el-form-item label="职级">
					<el-select v-model="adduser_form.proLevel" class="m-2" placeholder="Select" size="large">
						<el-option
							v-for="item in proLevel_options"
							:key="item.value"
							:label="item.label"
							:value="item.value"
						/>
					</el-select>
				</el-form-item>
				<el-form-item label="权限">
					<el-select v-model="adduser_form.role" class="m-2" placeholder="Select" size="large">
						<el-option
							v-for="item in role_options"
							:key="item.value"
							:label="item.label"
							:value="item.value"
						/>
					</el-select>
				</el-form-item>
			</el-form>
			<template #footer>
				<span class="dialog-footer">
					<el-button @click="addUserVisible = false">取 消</el-button>
					<el-button type="primary" @click="userAddSaveEdit">确 定</el-button>
				</span>
			</template>
		</el-dialog>
	</div>
</template>

<script setup lang="ts" name="basetable">
import { ref, reactive } from 'vue';
import { ElMessage, ElMessageBox } from 'element-plus';
import { Delete, Edit, Search, Plus } from '@element-plus/icons-vue';
import { fetchData } from '../api/index';

interface TableItem {
	id: number;
	name: string;
	money: string;
	email:string;
	phone:string;
	role:string;
	date: string;
	proLevel: string;
}

const query = reactive({
	address: '',
	name: '',
	pageIndex: 1,
	pageSize: 10
});
const tableData = ref<TableItem[]>([]);
const pageTotal = ref(0);
// 获取表格数据
const getData = () => {
	fetchData().then(res => {
		tableData.value = res.data.list;
		pageTotal.value = res.data.pageTotal || 50;
	});
};
getData();

// 查询操作
const handleSearch = () => {
	query.pageIndex = 1;
	getData();
};
// 分页导航
const handlePageChange = (val: number) => {
	query.pageIndex = val;
	getData();
};

// 删除操作
const handleDelete = (index: number) => {
	// 二次确认删除
	ElMessageBox.confirm('确定要删除吗？', '提示', {
		type: 'warning'
	})
		.then(() => {
			ElMessage.success('删除成功');
			tableData.value.splice(index, 1);
		})
		.catch(() => {});
};

// 表格编辑时弹窗和保存
const editVisible = ref(false);
let form = reactive({
	name: '',
	phone:'',
	email:'',
	proLevel:'',
	role:''
});
let idx: number = -1;
const handleEdit = (index: number, row: any) => {
	idx = index;
	form.name = row.name;
	form.phone = row.phone;
	form.email = row.email;
	form.proLevel = row.proLevel;
	form.role=row.role;
	editVisible.value = true;
};
const saveEdit = () => {
	editVisible.value = false;
	ElMessage.success(`修改第 ${idx + 1} 行成功`);
	tableData.value[idx].name = form.name;
	tableData.value[idx].phone = form.phone;
	tableData.value[idx].email = form.email;
	tableData.value[idx].proLevel = form.proLevel;
	tableData.value[idx].role = form.role;
};

// 表格新增元素编辑时弹窗和保存
const tableitem_adder = ref<TableItem>({
	id: 0,
	name: "string",
	money: "0",
	email:"string",
	phone:"string",
	role:"string",
	date: "2023-11-25",
	proLevel: "工人"
});
let adduser_form = reactive({
	name: '',
	phone:'',
	email:'',
	proLevel:'',
	role:''
});
const addUserVisible=ref(false);
const userAddHandleEdit = () => {
	addUserVisible.value = true;
};
const userAddSaveEdit = () => {
	tableitem_adder.value.id=tableData.value.length+1;
	tableitem_adder.value.name=adduser_form.name;
	tableitem_adder.value.phone=adduser_form.phone;
	tableitem_adder.value.email=adduser_form.email;
	tableitem_adder.value.proLevel=adduser_form.proLevel;
	tableitem_adder.value.role=adduser_form.role;
	addUserVisible.value = false;
	ElMessageBox.alert('添加用户成功', '提示', {
		// if you want to disable its autofocus
		// autofocus: false,
		confirmButtonText: 'OK',
  	})
	tableData.value.push(tableitem_adder.value);
	pageTotal.value=tableData.value.length;

};

//职级选项
const proLevel_options = [
  {
    value: '初级',
    label: '初级',
  },
  {
    value: '中级',
    label: '中级',
  },
  {
    value: '高级',
    label: '高级',
  },
];
//权限选项
const role_options = [
  {
    value: '管理员',
    label: '管理员',
  },
  {
    value: '普通用户',
    label: '普通用户',
  },
];

</script>

<style scoped>
.handle-box {
	margin-bottom: 20px;
}

.handle-select {
	width: 120px;
}

.handle-input {
	width: 300px;
}
.table {
	width: 100%;
	font-size: 14px;
}
.red {
	color: #F56C6C;
}
.mr10 {
	margin-right: 10px;
}
.table-td-thumb {
	display: block;
	margin: auto;
	width: 40px;
	height: 40px;
}
</style>
