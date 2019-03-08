//考勤组件
export default{
	template:`
		<div class="content">
			<el-select @change="changeShowListStatus" v-model="checkedStatus">
				<el-option v-for="(item,index) of statusList" :key="index" :value="item"></el-option>
			</el-select>
			
		    <el-date-picker value-format="yyyy-MM-dd" @change="changeShowListDate" v-model="checkedDate" type="date" placeholder="选择日期"></el-date-picker>


			<el-table :data="showList">
				<el-table-column label="员工姓名" prop="name">
				</el-table-column>
				<el-table-column label="所属部门" prop="department">
				</el-table-column>
				<el-table-column label="日期" prop="date">
				</el-table-column>
				<el-table-column label="上班打卡时间" prop="checkinTime">
					<template slot-scope="data">
						{{data.row.checkinTime.substring(11)}}
					</template>
				</el-table-column>
				<el-table-column label="下班打卡时间" prop="checkoutTime">
					<template slot-scope="data">
						<span v-if="data.row.checkoutTime">{{data.row.checkoutTime.substring(11)}}</span>
						<span v-else>暂无下班打卡记录</span>
					</template>
				</el-table-column>
				<el-table-column label="状态">
					<template slot-scope="data">
						<el-tag v-if="Number(data.row.checkinTime.substring(11)[1]) < 9"  type="success">正常</el-tag>
						<el-tag v-else type="warning">异常</el-tag>
					</template>
				</el-table-column>
			</el-table>
		</div>
	`,
	data(){
		return {
			list:[],
			showList:[],
			statusList:["全部","正常","异常"],
			checkedStatus:"全部",
			checkedDate:""
		}
	},
	methods:{
		changeShowListStatus(){
			this.showList = [];
			if(this.checkedStatus == "异常"){
				this.list.forEach((item)=>{
					if(Number(item.checkinTime.substring(11)[1]) >= 9){
						this.showList.push(item)
					}
				})
			}
			if(this.checkedStatus == "正常"){
				this.list.forEach((item)=>{
					if(Number(item.checkinTime.substring(11)[1]) < 9){
						this.showList.push(item)
					}
				})
			}
			if(this.checkedStatus == "全部"){
				this.list.forEach((item)=>{
					this.showList.push(item)
				})
			}
		},
		changeShowListDate(){
			this.showList = [];
			if(!this.checkedDate){
				this.list.forEach((item)=>{
					this.showList.push(item)
				})
			}
			else{
				this.list.forEach((item)=>{
					if(item.date == this.checkedDate){
						this.showList.push(item)
					}
				})
			}
		}
	},
	mounted(){
		axios.get("http://127.0.0.1:90/selcheakon").then((response)=>{	
			this.list = response.data;
			this.list.forEach((item)=>{
				this.showList.push(item);
			})
		})
	}		
}