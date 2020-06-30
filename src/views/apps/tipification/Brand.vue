<template>
	<div class="page-vue-good-table scrollable only-y">

		
		<pageheader v-bind:title="this.title" v-bind:subtitle="this.subtitle" v-bind:thirdtitle="this.thirdtitle"></pageheader>

		<div class="vue-good-table-box card-base card-shadow--medium">
			<vue-good-table
				:columns="columns"
				:rows="datos"
				styleClass="vgt-table condensed"
				:search-options="{
					enabled: true,
					placeholder: 'Buscar'
				}"
				:pagination-options="{
					enabled: true,
					mode: 'records',
					perPage: 10,
					perPageDropdown: [10, 20, 30, 40, 50],
					nextLabel: 'Sig',
					prevLabel: 'Ant',
					rowsPerPageLabel: 'Filas por página',
					ofLabel: 'de',
					pageLabel: 'página', // for 'pages' mode
					allLabel: 'All',
				}"
				:lineNumbers="false"
				class="styled">
				<div slot="table-actions">
					
					<el-button type="primary" round v-on:click="create()" v-if="canCreate()" ><b>AGREGAR</b></el-button>
				</div>		
				  <div slot="emptystate">
						Sin Datos
				  </div>		
				<template slot="table-row" slot-scope="props">
					<span v-if="props.column.field == 'actions'">
						<el-button type="success" icon="el-icon-edit" circle @click.prevent='edit(props.row)' v-if="canEdit()" ></el-button>
						<el-button type="danger" icon="el-icon-delete" circle @click="openDelete(props.row)" v-if="canDelete()" ></el-button>
					</span>
				</template>
			</vue-good-table>
		</div>

		<el-dialog  :title=formTitle  :visible.sync="dialogFormVisible">
			<el-form :model="modelo" :rules="rules" ref="modelo"  label-width="120px">
				<el-form-item v-bind:label="objectAttr('id').name" v-if="this.editedIndex == 0 && objectAttr('Id').visible"  :label-width="formLabelWidth"  prop="id">
					<el-input v-model="modelo.id" auto-complete="off" :disabled="!objectAttr('Id').enabled"></el-input>
				</el-form-item>				
				<el-form-item v-bind:label="objectAttr('description').name" :label-width="formLabelWidth" prop="description" v-if="objectAttr('Description').visible" :required="objectAttr('Description').required">
					<el-input v-model="modelo.description" auto-complete="off" :disabled="!objectAttr('Description').enabled"></el-input>
				</el-form-item>
				<el-form-item v-bind:label="objectAttr('enabled').name"  v-if="objectAttr('enabled').visible" :disabled="!objectAttr('enabled').enabled">
					<el-switch v-model="modelo.enabled"></el-switch>
				</el-form-item>				
			</el-form>			
			<span slot="footer" class="dialog-footer">
				<el-button @click="close()">Cancelar</el-button>
				<el-button type="primary" @click="save('modelo')">Guardar</el-button>
			</span>
		</el-dialog>

	</div>
</template>

<script>

import axios from 'axios'
export default {
	name: 'VehicleBrand',
	data(){
		return {
				URL_GET: 'api/VehicleBrands',
				URL_CREATE: 'api/VehicleBrands/Create',
				URL_UPDATE: 'api/VehicleBrands/Update',
				URL_DELETE: 'api/VehicleBrands/Delete',					
				title: 'Marca',
				subtitle: 'Tipificaciones',
				thirdtitle: 'Vehiculos',
				dialogFormVisible: false,
				editedIndex: -1,
                valida: 0,
                validaMensaje: [],	
				formLabelWidth: '120px',
				fields: null,
				datos: [],
				name:'VehicleBrand',
				fields:'',
				actions:'',
				user:null,
				modelo: {
						description: '',
						id: '',
						acctions: null,
						enabled: true
						},	
				rules: {
					description: [
						{ message: 'Por favor ingrese la marca', trigger: 'blur' },
						{ min: 1, max: 50, message: 'Debe tener entre 1 y 50 caracteres', trigger: 'blur' }
					]
					},												
				columns: [
					{
						label: 'Id',
						field: 'id',
						type: 'number',
						filterable: true
					},
					{
						label: 'Marca',
						field: 'description',
						type: 'number',
						filterable: true
					},
					{
						label: 'Acciones',
						field: 'actions',
						width: '180px',
						tdClass: 'text-center',
						html: true
					}  				
				],
				
			}		
	},
        created () {
			try {
				this.screen= this.$store.getters.userProfile.role.screens.filter(x=>x.path===this.$route.fullPath)[0];			
				if (this.screen !=null)
				{
					this.fields = this.screen.fields;				
					this.actions = this.screen.actions;	
					this.get();
				}
				else
					this.showError("No se pudo recuperar la configuración de la pantalla");
			} catch (error) {
				this.showError(error);
			}


        }, 	
	computed: {
		formTitle() {
			return this.editedIndex === -1? 'Crear '+this.title:'Editar '+this.title
		}		
	},

	methods: {
		objectAttr(fieldName){
			return  this.fields.find(conf => conf.field === fieldName)
		},
		canCreate(){
			if (this.actions=='')			
				return false;
			else
				return  this.actions.find(x => x.code === "CREATE")
		},
		canEdit(){
			if (this.actions=='')			
				return false;
			else
				return  this.actions.find(x => x.code === "EDIT")
		},
		canDelete(){
			if (this.actions=='')			
				return false;
			else
				return  this.actions.find(x => x.code === "DELETE")
		},						
		get(){
            let me = this;
            axios.get(this.URL_GET).then (function(response){
                me.datos = response.data;
            }).catch (function (error){
					me.showError(error);
            });
        },
		save(formName){		  
		  this.$refs[formName].validate((valid) => {
          if (valid) {
            if (this.editedIndex === 0) {
				//Editar
                let me = this;
                axios.put(this.URL_UPDATE,{
                    'Id': me.modelo.id,
                    'Description':me.modelo.description
                }).then(function(response){
                     me.close();
                     me.get();   
					 me.clean();
					 me.showOk();
                     
                }).catch(function(error){
                    me.showError(error);
                });
                
            } else {
				let me = this;
                axios.post(this.URL_CREATE,{
                    'Description':me.modelo.description
                }).then(function(response){
                     me.close();
                     me.get();   
					 me.clean();
					 me.showOk();
                     
                }).catch(function(error){
						me.showError(error);
				});

			}
			}
		  });
		},
		openDelete(objeto) {	
			this.modelo.id = objeto.id;
			this.$confirm('La ' + this.title + ' se eliminara permanentemente. Continua?', 'Cuidado', {
			confirmButtonText: 'OK',
			cancelButtonText: 'Cancelar',
			type: 'warning',
			center: true
			}
			).then(() => {
				let me = this;
                axios.put(this.URL_DELETE,{
                    'Id':me.modelo.id
                }).then(function(response){
                     me.close();
                     me.get();   
					 me.clean();
					 me.showOk();
                     
                }).catch(function(error){
						me.showError(error);
				});

			}).catch(() => {
				this.$message({
					type: 'info',
					message: 'Cancelado'
				});
			});
		},
		create() {

			 this.dialogFormVisible = true;	
			 this.editedIndex=-1;	
			 this.clean();	
			 //Obtengo valores por default			 
			 this.modelo.description= this.objectAttr('Description').defaultValue
			 			 
		},
		edit(objeto) {		
			 this.modelo.id = objeto.id; 
			 this.modelo.description= objeto.description
			 this.dialogFormVisible = true;
			 this.editedIndex=0;
		},
		close(){
			this.dialogFormVisible = false;
            this.clean();
		},
        clean(){
            this.modelo.id="";
            this.modelo.description="";
            this.editedIndex=-1;
		}
            			  	
 	}
}
</script>

<style lang="scss">
.page-vue-good-table {
	overflow: hidden;
	
}


</style>

