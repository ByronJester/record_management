<template>
	<div class="w-screen h-full">
		<div class="w-full flex flex-row justify-center items-center" style="height: 10vh; background: #366422">
			<div class="w-2/5 flex justify-end" style="margin-top: 5.5rem">
				<img src="/images/logo1.png" class="py-1" style="height: 15vh;"/>
			</div>

			<div class="w-4/5 flex" style="font-size: 4vw; margin-top: 5rem">
				<p class="pl-5"> Municipality of Balayan</p>
			</div>
		</div>

		<div class="w-full --panel" style="height: 90vh">
			<div class="--login__register w-full flex justify-center items-center">
				<div class="py-5 px-10">
					<div class="w-full flex justify-center items-center mb-5" style="font-size: 80px; color: #366422 !important">
						<i class="fa-solid fa-user"></i>
					</div>

					<input type="text" class="w-full  my-2 --login__register--input text-center"
						placeholder="Username" v-model="formData.username"
						@keyup.enter="login()"
					>

					<input type="password" class="w-full mt-2 --login__register--input text-center"
						:class="{'mb-2' : !message}"
						placeholder="Password" v-model="formData.password"
						@keyup.enter="login()"
					>

					<span class="text-red-500 text-xs ml-2" v-if="message">
						{{ message }}
					</span>

					<button class="w-full  my-2 --login__register--button text-center"
						@click="login()"
						:disabled="disableButton()"
						:class="{ 'cursor-not-allowed' : disableButton() }"
					>
						Login
					</button>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import { Inertia } from '@inertiajs/inertia';
import axios from "axios";

export default {
	props:[],
	data(){
		return {
			formData : {
				username: null,
				password: null 
			},
			message: null,
		}
	},

	methods: {
		login() {
			axios.post(this.$root.route + "/users/login", this.formData)
				.then(response => {

					if(response.data.status == 422) {
						// this.saveError = response.data.errors
						this.message = response.data.message
					} else {
						location.reload()
					}
				})
		},

		disableButton(){
			if(!this.formData.username){
				return true;
			}

			if(!this.formData.password){
				return true;
			}

			return false;
		}
	}
}

</script>

<style scoped>
.--panel {
	background-image: url('/images/background4.png');
	background-repeat: no-repeat;
 	background-size: 100vw 150vh;
	display: flex;
	align-items: center;
	justify-content: center;
}

.--login__register {
	width: auto;
	height: auto;
	/* background: #366422; */
	border-radius: 5px;
	position: relative;
	top: 1.5rem;
	left: 1.5rem;
	border: 3px solid black;
}

.--login__register--input {
	height: 40px;
	border-radius: 10px;
}

.--login__register--button {
	height: 40px;
	border-radius: 30px;
	background: #366422;
	color: white
}


</style>