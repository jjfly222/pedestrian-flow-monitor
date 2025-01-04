import { defineStore } from 'pinia'
import { ref, reactive } from 'vue'
import { v4 as uuidv4 } from 'uuid';
interface User {
  serialNumber:string,
  userId: string,
  name: string,
  permission: string,
  phoneNumber: string,
  inputTime:string,
  region: string,
  IDnumber: string
}


export const useUserStore = defineStore('userList', () => {
  const userInfo = ref<User[]>([{
    userId: '1',
    serialNumber:'1',
    name: '赵一',
    permission: 'administrator',
    phoneNumber: '16764382934',
    inputTime:'2024-10-01 09:25:20',
    region: '浦东金桥',
    IDnumber: '473829384938294628'
  }, {
    userId: '2',
    serialNumber:'2',
    name: '钱二',
    permission: 'normalUser',
    phoneNumber: '17364896378',
    inputTime:'2024-10-01 09:28:32',
    region: '浦东高行',
    IDnumber: '8767938762385948378'
  }, {
    userId: '3',
    serialNumber:'3',
    name: '孙三',
    permission: 'normalUser',
    phoneNumber: '16437652987',
    inputTime:'2024-10-01 09:44:06',
    region: '闵行莘庄',
    IDnumber: '656293871098342787'
  }])

  const addUser = (userData: User) => {
    userInfo.value.push(userData)
  }

  const editUser = (userData: User) => {
    userInfo.value.forEach(item => {
      if (item.userId === userData.userId) {
        item = userData
      }
    })
  }

  const deleteUser = (userData: User) => {

  }

  return {
    userInfo, addUser, editUser, deleteUser
  }
})