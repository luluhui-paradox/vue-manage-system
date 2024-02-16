<template>
	<div>
		<div class="container">
			<el-table :data="tableData" border class="table" ref="multipleTable" header-cell-class-name="table-header">
				<el-table-column prop="id" label="ID" width="55" align="center"></el-table-column>
				<el-table-column prop="name" label="查询类型"></el-table-column>
				<el-table-column prop="date" label="查询时间"></el-table-column>
				<el-table-column label="操作" width="220" align="center">
					<template #default="scope">
						<el-button text :icon="Edit" @click="handleOpenDetail(scope.$index, scope.row)">
							详情
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

		

		<!-- 林木三维弹出框 -->
		<el-dialog title="详情页" v-model="showfirstWorkVisible" width="30%">
			<el-form label-width="70px">
				<el-form-item label="类型">
					<el-input v-model="workDetail.name"></el-input>
				</el-form-item>
				<el-form-item label="左图像">
					<el-image style="width: 400px; height: 400px" :src="workDetail.leftPath" fit="contain">
                        <template #error>
                            <div class="image-slot">
                                <el-icon><icon-picture /></el-icon>
                            </div>
                        </template>
                    </el-image>
				</el-form-item>
				<el-form-item label="右图像">
					<el-image style="width: 400px; height: 400px" :src="workDetail.rightPath" fit="contain">
                        <template #error>
                            <div class="image-slot">
                                <el-icon><icon-picture /></el-icon>
                            </div>
                        </template>
                    </el-image>
				</el-form-item>
				<el-form-item label="结果">
					<el-input v-model="workDetail.result"></el-input>
				</el-form-item>
				<el-form-item label="日期">
					<el-input v-model="workDetail.date"></el-input>
				</el-form-item>
			</el-form>
		</el-dialog>

        <!-- 林木叶片识别弹出框 -->
		<el-dialog title="详情页" v-model="showsecondWorkVisible" width="30%">
			<el-form label-width="70px">
				<el-form-item label="类型">
					<el-input v-model="workDetail.name"></el-input>
				</el-form-item>
				<el-form-item label="叶片图像">
					<el-image style="width: 400px; height: 400px" :src="workDetail.leftPath" fit="contain">
                        <template #error>
                            <div class="image-slot">
                                <el-icon><icon-picture /></el-icon>
                            </div>
                        </template>
                    </el-image>
				</el-form-item>
				<el-form-item label="结果">
					<el-input v-model="workDetail.result"></el-input>
				</el-form-item>
				<el-form-item label="日期">
					<el-input v-model="workDetail.date"></el-input>
				</el-form-item>
			</el-form>
		</el-dialog>
	</div>
</template>

<script setup lang="ts" name="basetable">
import { ref, reactive } from 'vue';
import { ElMessage, ElMessageBox } from 'element-plus';
import { Delete, Edit, Search, Plus } from '@element-plus/icons-vue';
import { fetchData,getWorkHistory } from '../api/index';

interface TableItem {
	id: number;
	name: string;
	type: number;
	leftPath:string;
	rightPath:string;
	result:string;
	date: string;
}
const showfirstWorkVisible=ref(false);
const showsecondWorkVisible=ref(false);
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
	getWorkHistory().then(res => {
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

const workDetail = reactive({
	id: 0,
	name: '',
    type:0,
	leftPath:'',
    rightPath:'',
    result:'',
    date:'',
});

const handleOpenDetail = (index: number, row: any) => {
	workDetail.id = tableData.value[index].id;
    workDetail.type=tableData.value[index].type;
	workDetail.name = tableData.value[index].name;
	workDetail.leftPath = new URL(tableData.value[index].leftPath, import.meta.url).href;
	workDetail.rightPath = new URL(tableData.value[index].rightPath, import.meta.url).href;
	workDetail.result = tableData.value[index].result;
	workDetail.date=tableData.value[index].date;
    if(workDetail.type==4){
        showfirstWorkVisible.value=false;
        showsecondWorkVisible.value=true;
    }else{
        showsecondWorkVisible.value=false;
        showfirstWorkVisible.value=true;
    }
};

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