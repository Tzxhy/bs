<template>
	<section>
		<el-form :model="editForm" label-width="100px" class="edit" ref="editForm">
			<el-form-item label="起始坐标">
				<el-input v-model="editForm.startPoint" placeholder="0,0"></el-input>
			</el-form-item>
			<el-form-item label="终点坐标">
				<el-input v-model="editForm.endPoint" placeholder="3,3"></el-input>
			</el-form-item>
			<el-form-item label="节点间延时">
				<el-input v-model="editForm.delay" placeholder="0nS"></el-input>
			</el-form-item>
			<el-form-item label="节点间功耗">
				<el-input v-model="editForm.power" placeholder="0mW"></el-input>
			</el-form-item>
			<el-form-item label="动画播放次数">
				<el-input v-model="editForm.playTime" placeholder="填入数字或者Infinity"></el-input>
			</el-form-item>
			<el-form-item label="路由算法选择">
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
	import util from '../../common/js/util'

	export default {
		data() {
			return {
				//编辑界面数据
				editForm: {
					startPoint: '1,2',
					endPoint: '2,3',
					delay: '0mS',
					power: '1mW',
					playTime: '10',
					routeAlgorithm: 'XY-Route'

				},
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