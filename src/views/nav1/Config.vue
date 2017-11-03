<template>
	<section>
		<el-form :model="editForm" label-width="100px" class="edit" ref="editForm" :rules="rules">
			<el-form-item label="起始坐标" prop="startPoint">
				<el-input v-model="editForm.startPoint" placeholder="0,0"></el-input>
			</el-form-item>
			<el-form-item label="终点坐标" prop="endPoint">
				<el-input v-model="editForm.endPoint" placeholder="3,3"></el-input>
			</el-form-item>
			<el-form-item label="节点间延时" prop="delay">
				<el-input v-model="editForm.delay" placeholder="0nS"></el-input>
			</el-form-item>
			<el-form-item label="节点间功耗" prop="power">
				<el-input v-model="editForm.power" placeholder="0mW"></el-input>
			</el-form-item>
			<el-form-item label="动画播放次数" prop="playTime">
				<el-input v-model="editForm.playTime" placeholder="填入数字或者Infinity"></el-input>
			</el-form-item>
			<el-form-item label="路由算法选择" prop="routeAlgorithm">
				<el-select v-model="editForm.routeAlgorithm" placeholder="默认XY路由算法">
		      <el-option label="XY路由" value="XY-Route"></el-option>
		    </el-select>
			</el-form-item>
			<el-form-item>
				<el-button type="primary" @click="saveParam">保存</el-button>
			</el-form-item>
		</el-form>
	</section>
</template>

<script>
	// import util from '../../common/js/util'

	export default {
		data() {
			var pointCheck = (rule, value, callback)=>{
				if (!/^[0-3],[0-3]$/.test(value)) {
					callback(new Error('请检验您的输入！'));
				} else {
					callback();
				}
			}
			var delayCheck = (rule, value, callback)=>{
				if (!/^[\d]+[nm]?[sS]$/.test(value)) {
					callback(new Error('请检验您的输入！'));
				} else {
					callback();
				}
			}
			var powerCheck = (rule, value, callback)=>{
				if (!/^[\d]+[nm]?[wW]$/.test(value)) {
					callback(new Error('请检验您的输入！'));
				} else {
					callback();
				}
			}
			var playTimeCheck = (rule, value, callback)=>{
				if (!/^([\d]+)|(Infinity)$/.test(value)) {
					callback(new Error('请检验您的输入！'));
				} else {
					callback();
				}
			}
			return {
				//编辑界面数据
				rules: {
					startPoint: [
						{ required: true, message: '请输入起始坐标', trigger: 'blur' },
						{validator:pointCheck,trigger: 'blur'}
					],
					endPoint: [
						{ required: true, message: '请输入终点坐标', trigger: 'blur' },
						{validator:pointCheck,trigger: 'blur'}
					],
					delay: [
						{validator:delayCheck,trigger: 'blur'}
					],
					power: [
						{validator:powerCheck,trigger: 'blur'}
					],
					playTime: [
						{validator:playTimeCheck,trigger: 'blur'}
					]
				},
				editForm: this.$store.getters.getSinglePointToSinglePointParam,
			}
		},
		methods: {
			saveParam(){
				this.$store.commit('setSinglePointToSinglePoint', this.editForm);
				this.$message({
          message: '参数已保存，请查看动画演示！',
          type: 'success',
          duration: 3000
        });
			}
		},
		mounted() {
			console.log(this.$store);
		}
	}

</script>

<style scoped>
.edit {
	margin-top: 100px;
	margin-left: 200px;
	margin-right: 200px;
}
.el-form-item {
	/*width: 500px;*/
}

</style>