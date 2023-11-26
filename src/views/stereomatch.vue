<template>
    <div>
        <el-row>
            <el-col :span="24">
                <el-card>
                    <div>
                        <el-col :span="6">
                            <span style="position: ;">林木三维信息测量</span>
                        </el-col>
                    </div>
                </el-card>
            </el-col>
            
        </el-row>
        <el-row>
            <el-col :span="9">
                <el-card class="box-card">
                    <el-row>
                        <el-col>
                            <!-- left img -->
                            <el-row>
                                <el-col>
                                    <el-upload style="height: 50px;" drag  action="#" :show-file-list="false" :auto-upload="false"  
                                                accept="image/jpg,image/jpeg,image/png"
                                                :on-change="handleLeftImageChange">
                                        <span>insert left</span>
                                    </el-upload>
                                    <!-- <img v-if="leftImgUrl" :src="leftImgUrl" class="avatar"> -->
                                </el-col>
                            </el-row>
                            <el-row>
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
            <!-- RIGHT PIC -->
            <el-col :span="9">
                <el-card class="box-card">
                    <el-row>
                        <el-col>
                            <!-- right img -->
                            <el-row>
                                <el-col>
                                    <el-upload style="height: 50px;" drag  action="#" :show-file-list="false" :auto-upload="false"  
                                                accept="image/jpg,image/jpeg,image/png"
                                                :on-change="handleRightImageChange">
                                        <span>insert right</span>
                                    </el-upload>
                                    <!-- <img v-if="leftImgUrl" :src="leftImgUrl" class="avatar"> -->
                                </el-col>
                            </el-row>
                            <el-row>
                                <el-col :span="8">
                                    <el-image style="width: 500px; height: 500px" :src="RightImgUrl" fit="contain">
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
            <el-col :span="6">
                
                <el-card>
                    <template #header>
                        <el-button type="primary">我测你木</el-button>
                        <el-button type="danger">清空</el-button>
                    </template>
                </el-card>
            </el-col>
            
        </el-row>
        
    </div>
</template>

<script setup lang="ts" name="stereomatch">

import { ref, reactive } from 'vue';
import { useTagsStore } from '../store/tags';
import { usePermissStore } from '../store/permiss';
import { useRouter } from 'vue-router';
import { ElMessage, ElMessageBox } from 'element-plus';
import type { FormInstance, FormRules, UploadFile, UploadFiles } from 'element-plus';
import { Lock, User } from '@element-plus/icons-vue';

const leftImgUrl=ref("");
const RightImgUrl=ref("");

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
        return true
    }
};

const handleRightImageChange=(file)=>{
    console.log(file.raw.type)
    const isJPG = file.raw.type === 'image/jpeg'
    const isPNG = file.raw.type === 'image/png'
    // const isLt2M = file.raw.size / 1024 / 1024 < 0.5  //限制上传文件的大小
    if (!isPNG && !isJPG) {
        ElMessageBox.alert('上传图片只能是 JPG/PNG 格式!')
        return false
    } else {
        ElMessageBox.alert('上传成功')
        RightImgUrl.value=URL.createObjectURL(file.raw)
        return true
    }
}

</script>

<style>
.el-row {
	margin-bottom: 20px;
}
.el-card{
    margin-left: 5px;
    margin-right: 5px;
}
</style>