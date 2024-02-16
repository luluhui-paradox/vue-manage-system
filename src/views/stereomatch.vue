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
                                        
                                        <div class="el-upload__text">
                                            拖拽或<em>点击上传</em>左目相机图
                                        </div>
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
                                        <div class="el-upload__text">
                                            拖拽或<em>点击上传</em>右目相机图
                                        </div>
                                    </el-upload>
                                    <!-- <img v-if="leftImgUrl" :src="leftImgUrl" class="avatar"> -->
                                </el-col>
                            </el-row>
                            <el-row style="pic-show">
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
                        <el-button-group>
                            <el-button type="primary" @click="openRes1Dialog">林木测距</el-button>
                            <el-button type="primary" @click="openRes2Dialog">立木高度测量</el-button>
                            <el-button type="primary" @click="openRes3Dialog">胸径测量</el-button>
                            <el-button type="danger" @click="handleAllClear">清空</el-button>
                        </el-button-group>
                    </template>
                    <!-- result list -->
                    <div>
                        <el-form v-model="resultForm">
                            <el-form-item label="测距结果(cm)">
                                <el-input disabled v-model="resultForm.result1" />
                            </el-form-item>
                            <el-form-item label="立木高度(cm)">
                                <el-input disabled v-model="resultForm.result2" />
                            </el-form-item>
                            <el-form-item label="立木胸径(cm)">
                                <el-input disabled v-model="resultForm.result3" />
                            </el-form-item>
                        </el-form>
                    </div>
                </el-card>
            </el-col>
            
        </el-row>

        <!-- //dialog erea -->
        <!-- 林木测距 -->
        <el-dialog  width="50%" v-model="depthIsVisible" title="林木测距">
            <div v-loading="loading">
                <el-row>
                    <el-col :span="18">
                        <div>
                            <canvas @mouseup="onRes1CanvasClick" width="480" height="320"  ref="res1Canvas" class="canvas"></canvas>
                        </div>
                    </el-col>
                    <el-col :span="6">
                        <el-row>
                            <span>测距基点:</span>
                            <el-input v-model="depthBasePoint" disabled></el-input>
                        </el-row>
                        <el-row>
                            <el-button @click="depthIsVisible = false">Cancel</el-button>
                            <el-button type="primary" @click="onRes1CanvasConfirm">Confirm</el-button>
                        </el-row>
                        
                    </el-col>
                </el-row>
            </div>
        </el-dialog>
        <!-- 立木高度测量 -->
        <el-dialog width="50%" v-model="heightIsVisible" title="立木高度测量">
            <div v-loading="loading">
                <el-row>
                    <el-col :span="18">
                        <div>
                            <canvas @mouseup="onRes2CanvasClick" width="480" height="320"  ref="res2Canvas" class="canvas"></canvas>
                        </div>
                    </el-col>
                    <el-col :span="6">
                        <el-row>
                            <span>{{heightShowLabel}}:</span>
                            <el-input v-model="heightBasePoint" disabled></el-input>
                        </el-row>
                        <el-row>
                            <el-button @click="heightIsVisible = false">Cancel</el-button>
                            <el-button type="primary" @click="onRes2CanvasConfirm">Confirm</el-button>
                        </el-row>
                        
                    </el-col>
                </el-row>
            </div>
        </el-dialog>
        <!-- 胸径测量 -->
        <el-dialog width="50%" v-model="circleIsVisible" title="胸径测量">
            <div v-loading="loading">
                <el-row>
                    <el-col :span="18">
                        <div>
                            <canvas @mouseup="onRes3CanvasClick" width="480" height="320"  ref="res3Canvas" class="canvas"></canvas>
                        </div>
                    </el-col>
                    <el-col :span="6">
                        <el-row>
                            <span>胸径测量</span>
                            <el-input v-model="circleBasePoint" disabled></el-input>
                        </el-row>
                        <el-row>
                            <el-button @click="circleIsVisible = false">Cancel</el-button>
                            <el-button type="primary" @click="onRes3CanvasConfirm">Confirm</el-button>
                        </el-row>
                        
                    </el-col>
                </el-row>
            </div>
        </el-dialog>
    </div>
</template>

<script setup lang="ts" name="stereomatch">

import { ref, reactive,onMounted ,nextTick} from 'vue';
import { useTagsStore } from '../store/tags';
import { usePermissStore } from '../store/permiss';
import { useRouter } from 'vue-router';
import { ElMessage, ElMessageBox } from 'element-plus';
import type { Action, FormInstance, FormRules, UploadFile, UploadFiles } from 'element-plus';
import { Lock, User } from '@element-plus/icons-vue';
import { throttledWatch } from '@vueuse/shared';
import App from '../App.vue';

const leftImgUrl=ref("");
const RightImgUrl=ref("");

const depthIsVisible=ref(false);
const heightIsVisible=ref(false);
const circleIsVisible=ref(false);

const pic_height=ref(320);
const pic_width=ref(480);


const res1Canvas=ref();
const res2Canvas=ref();
const res3Canvas=ref();
const loading=ref(false);

const depthBasePoint=ref("");
const heightBasePoint=ref("");
const circleBasePoint=ref("");
const heightShowLabel=ref("立木基点");
onMounted(() => {
    console.log(res1Canvas.value)
})

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

const handleAllClear=()=>{
    ElMessageBox.alert('您确定要重置表格么？', '清空资源', {
    confirmButtonText: '确定',
    cancelButtonText:"取消",
    callback: (action: Action) => {
        leftImgUrl.value=""
        RightImgUrl.value=""
        resultForm.result1=""
        resultForm.result2=""
        resultForm.result3=""
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
    console.log("RightImgUrl.value:"+RightImgUrl.value)
    return leftImgUrl.value!=""&&RightImgUrl.value!="";
}

//林木测距
const openRes1Dialog=()=>{
    if(!isDualPic()){
        ElMessageBox.alert("没图你测你码呢")
        return;
    }
    depthIsVisible.value=true
    nextTick(()=>{
        let ctx=res1Canvas.value.getContext('2d');
        let img = new Image()
        img.src = leftImgUrl.value
        img.onload = function(){
            if(img.complete){
                //  根据图像重新设定了canvas的长宽
                res1Canvas.value.setAttribute("width",img.width/2)
                res1Canvas.value.setAttribute("height",img.height/2)
                //  绘制图片
                ctx.drawImage(img,0,0,img.width/2,img.height/2)
            }
        }
    })
}

const onRes1CanvasClick=(e)=>{
    let ctx=res1Canvas.value.getContext('2d');
    //ctx.clearRect(0,0,640,480)
    let img = new Image()
    img.src = leftImgUrl.value
    img.onload = function(){
        if(img.complete){
            //  根据图像重新设定了canvas的长宽
            res1Canvas.value.setAttribute("width",img.width/2)
            res1Canvas.value.setAttribute("height",img.height/2)
            //  绘制图片
            ctx.drawImage(img,0,0,img.width/2,img.height/2)
            //画点
            ctx=res1Canvas.value.getContext('2d')
            let x_pos=e.offsetX
            let y_pos=e.offsetY
            depthBasePoint.value=x_pos+":"+y_pos
            ctx.arc(x_pos,y_pos,5,0,2*Math.PI);
            ctx.fill()
            ctx.stroke()
        }
    }
}

const onRes1CanvasConfirm=()=>{
    depthIsVisible.value=true;
    //loading
    loading.value=true;
    //set time
    setTimeout(()=>{
        depthIsVisible.value=false;
        loading.value=false;
        //add data
        resultForm.result1="215"
        //show message
        ElMessage.info("测量成功")
    },2000)
}

//立木测距
const openRes2Dialog=()=>{
    if(!isDualPic()){
        ElMessageBox.alert("没图你测你码呢")
        return;
    }
    heightIsVisible.value=true
    nextTick(()=>{
        let ctx=res2Canvas.value.getContext('2d');
        let img = new Image()
        img.src = leftImgUrl.value
        img.onload = function(){
            if(img.complete){
                //  根据图像重新设定了canvas的长宽
                res2Canvas.value.setAttribute("width",img.width/2)
                res2Canvas.value.setAttribute("height",img.height/2)
                //  绘制图片
                ctx.drawImage(img,0,0,img.width/2,img.height/2)
            }
        }
    })
}
const onRes2CanvasClick=(e)=>{
    let ctx=res2Canvas.value.getContext('2d');
    //ctx.clearRect(0,0,640,480)
    let img = new Image()
    img.src = leftImgUrl.value
    img.onload = function(){
        if(img.complete){
            //  根据图像重新设定了canvas的长宽
            res2Canvas.value.setAttribute("width",img.width/2)
            res2Canvas.value.setAttribute("height",img.height/2)
            //  绘制图片
            ctx.drawImage(img,0,0,img.width/2,img.height/2)
            //画点
            ctx=res2Canvas.value.getContext('2d')
            let x_pos=e.offsetX
            let y_pos=e.offsetY
            heightBasePoint.value=x_pos+":"+y_pos
            ctx.arc(x_pos,y_pos,5,0,2*Math.PI);
            ctx.fill()
            ctx.stroke()
        }
    }
}

const onRes2CanvasConfirm=()=>{
    if(heightShowLabel.value=="立木基点"){
        heightIsVisible.value=false;
        heightShowLabel.value="立木高度测距点"
        openRes2Dialog()
        return;
    }
    heightIsVisible.value=true;
    //loading
    loading.value=true;
    //set time
    setTimeout(()=>{
        heightIsVisible.value=false;
        loading.value=false;
        heightShowLabel.value="立木基点"
        //add data
        resultForm.result2="296"
        //show message
        ElMessage.info("测量成功")
    },2000)
}
//胸径测量
const openRes3Dialog=()=>{
    if(!isDualPic()){
        ElMessageBox.alert("没图你测你码呢")
        return;
    }
    circleIsVisible.value=true
    nextTick(()=>{
        let ctx=res3Canvas.value.getContext('2d');
        let img = new Image()
        img.src = leftImgUrl.value
        img.onload = function(){
            if(img.complete){
                //  根据图像重新设定了canvas的长宽
                res3Canvas.value.setAttribute("width",img.width/2)
                res3Canvas.value.setAttribute("height",img.height/2)
                //  绘制图片
                ctx.drawImage(img,0,0,img.width/2,img.height/2)
            }
        }
    })
}
const onRes3CanvasClick=(e)=>{
    let ctx=res3Canvas.value.getContext('2d');
    //ctx.clearRect(0,0,640,480)
    let img = new Image()
    img.src = leftImgUrl.value
    img.onload = function(){
        if(img.complete){
            //  根据图像重新设定了canvas的长宽
            res3Canvas.value.setAttribute("width",img.width/2)
            res3Canvas.value.setAttribute("height",img.height/2)
            //  绘制图片
            ctx.drawImage(img,0,0,img.width/2,img.height/2)
            //画点
            ctx=res3Canvas.value.getContext('2d')
            let x_pos=e.offsetX
            let y_pos=e.offsetY
            circleBasePoint.value=x_pos+":"+y_pos
            ctx.arc(x_pos,y_pos,5,0,2*Math.PI);
            ctx.fill()
            ctx.stroke()
        }
    }
}

const onRes3CanvasConfirm=()=>{
    circleIsVisible.value=true;
    //loading
    loading.value=true;
    //set time
    setTimeout(()=>{
        circleIsVisible.value=false;
        loading.value=false;
        //add data
        resultForm.result3="43"
        //show message
        ElMessage.info("测量成功")
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
</style>