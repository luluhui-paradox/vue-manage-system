<template >
    <div>
        <el-row>
            <el-col :span="22" style="margin-left: 4%;">
                <el-card class="topcard">
                    <div>
                        <el-col :span="6">
                            <span>林木叶片识别</span>
                        </el-col>
                    </div>
                </el-card>
            </el-col>
            
        </el-row>
        <el-row>
            <el-col :span="9" :offset="1">
                <el-card class="box-card">
                    <el-row>
                        <el-col>
                            <!-- left img -->
                            <el-row>
                                <el-col>
                                    <el-upload style="height: 50px;" drag  action="#" :show-file-list="false" :auto-upload="false"  
                                                accept="image/jpg,image/jpeg,image/png"
                                                :on-change="handleLeftImageChange">
                                        
                                        <div class="el-upload__text">
                                            拖拽或<em>点击上传</em>
                                        </div>
                                    </el-upload>
                                    <!-- <img v-if="leftImgUrl" :src="leftImgUrl" class="avatar"> -->
                                </el-col>
                            </el-row>
                            <el-row style="margin-top: 50px;">
                                <el-col :span="8">
                                    <el-image style="width: 500px; height: 500px" :src="leftImgUrl" fit="contain">
                                        <template #error>
                                            <div class="image-slot">
                                                <el-icon><icon-picture /></el-icon>
                                            </div>
                                        </template>
                                    </el-image>
                                </el-col>
                            </el-row>
                        </el-col>
                    </el-row>
                </el-card>
            </el-col>
            <!-- result -->
            <el-col :span="9" :offset="1">
                
                <el-card>
                    <template #header>
                        <el-button-group>
                            <el-button type="primary" @click="handleLeafRecog" >林木叶片识别</el-button>
                            <el-button type="danger" @click="handleAllClear">清空</el-button>
                        </el-button-group>
                    </template>
                    <!-- result list -->
                    <div>
                        <el-form v-model="resultForm">
                            <el-form-item label="识别结果">
                                <el-input disabled v-model="resultForm.result1" />
                            </el-form-item>
                            <el-form-item>
                                <el-col>
                                    <span>样例叶片</span>
                                </el-col>
                                <el-image style="width: 400px; height: 400px" :src="resImgUrl" fit="contain">
                                        <template #error>
                                            <div class="image-slot">
                                                <el-icon><icon-picture /></el-icon>
                                            </div>
                                        </template>
                                    </el-image>
                            </el-form-item>
                        </el-form>
                    </div>
                </el-card>
            </el-col>
            
        </el-row>
    </div>
</template>

<script setup lang="ts" name="stereomatch">

import { ref, reactive,onMounted ,nextTick} from 'vue';
import { useTagsStore } from '../store/tags';
import { usePermissStore } from '../store/permiss';
import { useRouter } from 'vue-router';
import { ElLoading, ElMessage, ElMessageBox } from 'element-plus';
import type { Action, FormInstance, FormRules, UploadFile, UploadFiles } from 'element-plus';
import { Lock, User } from '@element-plus/icons-vue';
import { throttledWatch } from '@vueuse/shared';
import App from '../App.vue';
import imgex from '../assets/leafImg/1135.jpg';
import leaf_pic from '../assets/leafImg/aesculus_flava.jpg';

const leftImgUrl=ref("");
const resImgUrl=ref("");

const resultForm=reactive({
    result1:"",
    result2:"",
    result3:"",
})

const handleLeftImageChange=(file)=>{
    // console.log(file)
    const isJPG = file.raw.type === 'image/jpeg'
    const isPNG = file.raw.type === 'image/png'
    // const isLt2M = file.raw.size / 1024 / 1024 < 0.5  //限制上传文件的大小
    if (!isPNG && !isJPG) {
        ElMessageBox.alert('上传图片只能是 JPG/PNG 格式!')
        return false
    } else {
        ElMessageBox.alert('上传成功')
        leftImgUrl.value=URL.createObjectURL(file.raw)
        console.log(file.raw)
        return true
    }
};

const handleAllClear=()=>{
    ElMessageBox.alert('您确定要重置表格么？', '清空资源', {
    confirmButtonText: '确定',
    cancelButtonText:"取消",
    callback: (action: Action) => {
        leftImgUrl.value=""
        resultForm.result1=""
        resultForm.result2=""
        resultForm.result3=""
        resImgUrl.value=""
        ElMessage({
            type: 'info',
            message: "all clear",
        })
    },
  })
}

//判断图像是否存在
function isDualPic(){
    console.log("leftImgUrl.value:"+leftImgUrl.value)
    return leftImgUrl.value!="";
}

const handleLeafRecog=()=>{
    if(!isDualPic()){
        ElMessageBox.alert("没图你测个锤子");
        return;
    }
    const loading = ElLoading.service({
        lock: true,
        text: 'Loading',
        background: 'rgba(0, 0, 0, 0.7)',
    })
    setTimeout(()=>{
        loading.close()
        resultForm.result1="红七叶树"
        resImgUrl.value=leaf_pic
    },2000)
}

</script>

<style scoped>
.el-row {
	margin-bottom: 20px;
}
.el-card{
    margin-left: 5px;
    margin-right: 5px;
}

#pic-shower{
    margin-top: 20px;
}

.canvas {
        border:1px solid;
}

.backg{
    background-image: url("../assets/img/login.jpg");
    background-size: 100%;
    height: 100%;
    width: 100%;
}

.topcard{
    margin-top: 20px;
    margin-bottom: 20px;
}
</style>