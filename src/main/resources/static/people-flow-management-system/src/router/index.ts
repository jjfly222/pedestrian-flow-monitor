import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
import MenuCtl from "@/views/menuCtl.vue"
import home from "@/views/homepage.vue"
const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    redirect: "/home",
  },
  {
      path: "/home",
      name: "home",
      component: home,
  },
  // 权限管理
  {
    path: "/auth_manager",
    name: "auth_manager",
    component: home,
    meta: { title: '权限管理', icon: 'Tools' },
    children: [
      {
        path: "monitor_info_manager",
        name: "monitor_info_manager",
        component: () => import("@/views/auth_manager/monitor_info_manager.vue"),
        meta: { title: '监控信息管理' }
      },
      {
        path: "permission_manager",
        name: "permission_manager",
        component: () => import("@/views/auth_manager/permission_manager.vue"),
        meta: { title: '地图组权限分配' }
      },
      {
        path: "personal_manager",
        name: "personal_manager",
        component: () => import("@/views/auth_manager/personal_manager.vue"),
        meta: { title: '个人信息管理' }
      },
      {
        path: "user_manager",
        name: "user_manager",
        component: () => import("@/views/auth_manager/user_manager.vue"),
        meta: { title: '用户管理' }
      }
    ]
  },
  // 地图组管理
  {
    path: "/map_group_manager",
    name: "map_group_manager",
    component: home,
    meta: { title: '地图组管理', icon: 'Place' },
    children: [
      {
        path: "map_group_setting",
        name: "map_group_setting",
        component: () => import("@/views/map_group_manager/map_group_setting.vue"),
        meta: { title: '地图分组设置' }
      },
      {
        path: "param_setting",
        name: "param_setting",
        component: () => import("@/views/map_group_manager/param_setting.vue"),
        meta: { title: '参数设置' }
      }
    ]
  },
  // 监控管理
  {
    path: "/query_record_operation",
    name: "query_record_operation",
    component: home,
    meta: { title: '监控信息管理', icon: 'VideoCameraFilled' },
    children: [
      {
        path: "monitor_view",
        name: "monitor_view",
        component: () => import("@/views/query_record_operation/monitor_view.vue"),
        meta: { title: '监控查看' }
      },
      {
        path: "report_view",
        name: "report_view",
        component: () => import("@/views/query_record_operation/report_view.vue"),
        meta: { title: '报表查看' }
      },
      {
        path: "warning_info_view",
        name: "warning_info_view",
        component: () => import("@/views/query_record_operation/warning_info_view.vue"),
        meta: { title: '告警信息查看' }
      },
      
    ]
  },
  // 告警管理
  {
    path: "/alarm_manager",
    name: "alarm_manager",
    component: home,
    meta: { title: '告警管理', icon: 'AlarmClock' },
    children: [
      {
        path: "alarm_info_manager",
        name: "alarm_info_manager",
        component: () => import("@/views/alarm_manager/alarm_info_manager.vue"),
        meta: { title: '告警信息管理' }
      },
      {
        path: "alarm_info_template_manager",
        name: "alarm_info_template_manager",
        component: () => import("@/views/alarm_manager/alarm_info_template_manager.vue"),
        meta: { title: '告警信息模板设置' }
      }
    ]
  },
 
];
const router = createRouter({
  history: createWebHashHistory(),
  routes,
});
export default router;