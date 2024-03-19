import { defineStore } from 'pinia'
import { ref, reactive } from 'vue'
import { v4 as uuidv4 } from 'uuid';
interface User {
  userId: string,
  name: string,
  permission: string,
  phoneNumber: string,
  region: string,
  IDnumber: string
}


export const useUserStore = defineStore('userList', () => {
  const userInfo = ref<User[]>([{
    userId: uuidv4(),
    name: '赵一',
    permission: 'administrator',
    phoneNumber: '16764382934',
    region: '阿兰达',
    IDnumber: '473829384938294628'
  }, {
    userId: uuidv4(),
    name: '钱二',
    permission: 'normalUser',
    phoneNumber: '17364896378',
    region: '毕青海',
    IDnumber: '8767938762385948378'
  }, {
    userId: uuidv4(),
    name: '孙三',
    permission: 'normalUser',
    phoneNumber: '16437652987',
    region: '蓝溪区',
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