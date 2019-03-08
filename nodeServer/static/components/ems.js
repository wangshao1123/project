export default {
	template:`
		<div>
		    <el-button type="primary" icon="el-icon-plus" @click="editBut">注册</el-button>
		    <el-dialog title="员工信息注册" :visible.sync="editBox" width="30%" :before-close="handleClose">
		    	<el-form ref="editData" :model="editData" label-width="80px" :rules="rules">
	  				<el-form-item label="姓名" prop="name">
	    				<el-input v-model="editData.name" clearable></el-input>
	  				</el-form-item>
	  				<el-form-item label="性别">
	    				<template>
	    					<el-radio-group v-model="editData.sex">
								<el-radio-button label="男"></el-radio-button>
								<el-radio-button label="女"></el-radio-button>
							</el-radio-group>
						</template>
	  				</el-form-item>
	  				<el-form-item label="生日">
	    				<template>
	    					<el-date-picker v-model="editData.birthday" type="date" placeholder="选择日期" value-format="yyyy-MM-dd"></el-date-picker>
	    				</template>
	  				</el-form-item>
	  				<el-form-item label="部门" prop="department">
	    				<template>
							<el-select v-model="editData.department" placeholder="请选择" clearable>
								<el-option v-for="item in department" :key="item.value" :label="item.label" :value="item.value">
								</el-option>
							</el-select>
						</template>
	  				</el-form-item>
	  				<el-form-item label="在职状态">
	  					<template>
	  						<el-switch v-model="editData.status" active-text="新入职" inactive-text="已离职" active-value="新入职" inactive-value="已离职"></el-switch>
	  					</template>
	  				</el-form-item>
	  				<el-form-item label="入职时间" v-if="editData.status=='新入职'">
	    				<template>
	    					<el-date-picker v-model="editData.joinDate" type="date" placeholder="选择日期" value-format="yyyy-MM-dd"></el-date-picker>
	    				</template>
	  				</el-form-item>
	  				<el-form-item label="离职时间" v-if="editData.status=='已离职'">
	    				<template>
	    					<el-date-picker v-model="editData.leaveDate" type="date" placeholder="选择日期" value-format="yyyy-MM-dd"></el-date-picker>
	    				</template>
	  				</el-form-item>
	  				<el-form-item label="薪水" prop="salary">
	    				<el-input v-model="editData.salary" clearable></el-input>
	  				</el-form-item>
	  				<el-form-item label="身份证号" prop="IDCard">
	    				<el-input v-model="editData.IDCard" clearable></el-input>
	  				</el-form-item>
	  				<el-form-item label="手机号" prop="number">
	    				<el-input v-model="editData.number" clearable></el-input>
	  				</el-form-item>
	  			</el-form>
  				<span slot="footer" class="dialog-footer">
	    			<el-button @click="editBox = false">取 消</el-button>
	    			<el-button type="primary" @click="register">确 定</el-button>
  				</span>
			</el-dialog>
			<el-dialog title="修改员工信息" :visible.sync="modifyBox" width="30%" :before-close="handleClose">
		    	<el-form ref="modifyData" :model="modifyData" label-width="80px" :rules="rules">
	  				<el-form-item label="姓名" prop="name">
	    				<el-input v-model="modifyData.name" clearable></el-input>
	  				</el-form-item>
	  				<el-form-item label="性别">
	    				<template>
	    					<el-radio-group v-model="modifyData.sex">
								<el-radio-button label="男"></el-radio-button>
								<el-radio-button label="女"></el-radio-button>
							</el-radio-group>
						</template>
	  				</el-form-item>
	  				<el-form-item label="生日">
	    				<template>
	    					<el-date-picker v-model="modifyData.birthday" type="date" placeholder="选择日期" value-format="yyyy-MM-dd"></el-date-picker>
	    				</template>
	  				</el-form-item>
	  				<el-form-item label="部门" prop="department">
	    				<template>
							<el-select v-model="modifyData.department" placeholder="请选择" clearable>
								<el-option v-for="item in department" :key="item.value" :label="item.label" :value="item.value">
								</el-option>
							</el-select>
						</template>
	  				</el-form-item>
	  				<el-form-item label="在职状态">
	  					<template>
	  						<el-switch v-model="modifyData.status" active-text="新入职" inactive-text="已离职" active-value="新入职" inactive-value="已离职"></el-switch>
	  					</template>
	  				</el-form-item>
	  				<el-form-item label="入职时间" v-if="modifyData.status=='新入职'">
	    				<template>
	    					<el-date-picker v-model="modifyData.joinDate" type="date" placeholder="选择日期" value-format="yyyy-MM-dd"></el-date-picker>
	    				</template>
	  				</el-form-item>
	  				<el-form-item label="离职时间" v-if="modifyData.status=='已离职'">
	    				<template>
	    					<el-date-picker v-model="modifyData.leaveDate" type="date" placeholder="选择日期" value-format="yyyy-MM-dd"></el-date-picker>
	    				</template>
	  				</el-form-item>
	  				<el-form-item label="薪水" prop="salary">
	    				<el-input v-model="modifyData.salary" clearable></el-input>
	  				</el-form-item>
	  				<el-form-item label="身份证号" prop="IDCard">
	    				<el-input v-model="modifyData.IDCard" clearable></el-input>
	  				</el-form-item>
	  				<el-form-item label="手机号" prop="number">
	    				<el-input v-model="modifyData.number" clearable></el-input>
	  				</el-form-item>
	  			</el-form>
  				<span slot="footer" class="dialog-footer">
	    			<el-button @click="modifyBox = false">取 消</el-button>
	    			<el-button type="primary" @click="update">确 定</el-button>
  				</span>
			</el-dialog>
		    <template>
				<el-table :data="selData" stripe style="width: 100%;margin-top: 20px;">
					<el-table-column prop="id" label="ID" fixed width="50"></el-table-column>
					<el-table-column prop="name" label="姓名"></el-table-column>
					<el-table-column prop="sex" label="性别"></el-table-column>
					<el-table-column prop="birthday" label="生日"></el-table-column>
					<el-table-column prop="department" label="部门"></el-table-column>
					<el-table-column label="在职状态">
						<template slot-scope="selData">
							<el-tooltip :content="selData.row.joinDate" placement="top">
								<el-tag v-if="selData.row.status=='新入职'" type="success" class="pointer">新入职</el-tag>
							</el-tooltip>
							<el-tooltip :content="selData.row.leaveDate" placement="top">
								<el-tag v-if="selData.row.status=='已离职'" type="danger" class="pointer">已离职</el-tag>
							</el-tooltip>
						</template>
					</el-table-column>
					<el-table-column prop="salary" label="薪水"></el-table-column>
					<el-table-column prop="IDCard" label="身份证"></el-table-column>
					<el-table-column prop="number" label="手机号"></el-table-column>
					<el-table-column label="操作" fixed="right" width="150">
						<template slot-scope="selData">
							<el-button type="primary" icon="el-icon-edit" @click="modify(selData.row)"></el-button>
							<el-button type="primary" icon="el-icon-delete" @click="del(selData.row.id)"></el-button>
						</template>
					</el-table-column>
				</el-table>
			</template>
		</div>
	`,
	data(){
		return {
			editData:{
				name:"",
				sex:"男",
				birthday:"",
				department:"技术部",
				status:"新入职",
				salary:"",
				IDCard:"",
				number:"",
				joinDate:"",
				leaveDate:""
			},
			modifyData:{
				id:"",
				name:"",
				sex:"男",
				birthday:"",
				department:"技术部",
				status:"新入职",
				salary:"",
				IDCard:"",
				number:"",
				joinDate:"",
				leaveDate:""
			},
			editBox:false,
			modifyBox:false,
			selData:[],
			rules:{
				name: [
		            { required: true, message: '请输入姓名', trigger: 'blur' },
		            { min: 2, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
		        ],
		        department:[
		        	{ required: true, message: '请选择部门', trigger: 'blur' }
		        ],
		        salary:[
		        	{ required: true, message: '请输入薪水', trigger: 'blur' }
		        ],
		        IDCard:[
		        	{ required: true, message: '请输入身份证号码', trigger: 'blur' },
		            { min: 18, max: 18, message: '身份证号输入有误', trigger: 'blur' }
		        ],
		        number:[
		        	{ required: true, message: '请输入手机号码', trigger: 'blur' },
		            { min: 11, max: 20, message: '手机号码输入有误', trigger: 'blur' }
		        ]
			},
			department:[
				{
					value:"技术部",
					label:"技术部"
				},
				{
					value:"人事部",
					label:"人事部"
				}
			]
		}
	},
	methods:{
		editBut(){
			this.editBox=true;
			for(let i in this.editData){
				this.editData[i]="";
			}
			this.editData.sex="男";
			this.editData.status="新入职";
			this.editData.department="技术部";
		},
		modify(data){
			this.modifyBox=true;
			for(let i in data){
				this.modifyData[i]=data[i];
			}
		},
		selectData(){
			axios.get("http://127.0.0.1:90/sel").then((response)=>{
				this.selData=response.data;
			});
		},
		handleClose(done) {
	        this.$confirm('确认关闭？').then(() => {
	            done();
	          }).catch(() => {});
	    },
	    register(){
	    	if(this.editData.name&&this.editData.department&&this.editData.salary&&this.editData.IDCard&&this.editData.number){
	    		axios.get("http://127.0.0.1:90/register",{
	    			params:{
	    				name:this.editData.name,
		    			sex:this.editData.sex,
		    			birthday:this.editData.birthday,
		    			department:this.editData.department,
		    			status:this.editData.status,
		    			salary:this.editData.salary,
		    			IDCard:this.editData.IDCard,
		    			number:this.editData.number,
		    			joinDate:this.editData.joinDate,
		    			leaveDate:this.editData.leaveDate
	    			}
	    		}).then((response)=>{
	    			if(response.data=="error"){
						this.$message({
		    				message: '注册失败！',
					        type: 'error'
				        });
					}else{
						this.$notify({
		    				title: '注册成功！！',
					        type: 'success'
				        });
						this.editBox=false;
						this.selectData();
					}
	    		})
	    	}else{
	    		this.$message({
    				message: '请将信息填写完整！',
			        type: 'warning'
		        });
	    	}
	    },
	    update(){
	    	if(this.modifyData.name&&this.modifyData.department&&this.modifyData.salary&&this.modifyData.IDCard&&this.modifyData.number){
	    		axios.get("http://127.0.0.1:90/updata",{
	    			params:{
	    				id:this.modifyData.id,
	    				name:this.modifyData.name,
		    			sex:this.modifyData.sex,
		    			birthday:this.modifyData.birthday,
		    			department:this.modifyData.department,
		    			status:this.modifyData.status,
		    			salary:this.modifyData.salary,
		    			IDCard:this.modifyData.IDCard,
		    			number:this.modifyData.number,
		    			joinDate:this.modifyData.joinDate,
		    			leaveDate:this.modifyData.leaveDate
	    			}
	    		}).then((response)=>{
	    			if(response.data=="error"){
						this.$message({
		    				message: '修改失败！',
					        type: 'error'
				        });
					}else{
						this.$notify({
		    				title: '修改成功！！',
					        type: 'success'
				        });
						this.modifyBox=false;
						this.selectData();
					}
	    		})
	    	}else{
	    		this.$message({
    				message: '请将信息填写完整！',
			        type: 'warning'
		        });
	    	}
	    },
	    del(id){
	    	this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
	        	confirmButtonText: '确定',
	        	cancelButtonText: '取消',
	        	type: 'warning'
	        }).then(()=>{
	        	axios.get("http://127.0.0.1:90/del?id="+id).then((response)=>{
		    		if(response.data=="error"){
		    			this.$message({
		    				message: '删除失败！',
					        type: 'error'
				        });
		    		}else{
		    			this.$notify({
		    				title: '删除成功！！',
					        type: 'success'
				        });
		    			this.selectData();
		    		}
		    	})
	        }).catch(() => {
	        	this.$message({
		            type: 'info',
		            message: '已取消删除'
	        	});          
	        });
	    }
	},
	mounted(){
		this.selectData();
	}
}