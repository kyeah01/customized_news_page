<template>
    <v-card>
    <v-card-title>
      <span color="primary">사용자 로그 검색</span>
      <v-spacer></v-spacer>
      <v-text-field
        v-model="search"
        append-icon="search"
        label="Search UserId"
        single-line
        hide-details
      ></v-text-field>
    </v-card-title>

    <v-data-table
      :headers="headers"
      :items="userInfo"
      :search="search"
    >
      <template v-slot:items="props">
        <td class="text-xs-left">{{ props.item.id }}</td>
        <td class="text-xs-left">{{ props.item.domain }}</td>
        <td class="text-xs-left">{{ props.item.log }}</td>
        <td class="text-xs-left">{{ props.item.time}}</td>
      </template>
      <template v-slot:no-results>
        <v-alert :value="true" color="error" icon="warning">
          Your search for "{{ search }}" found no results.
        </v-alert>
      </template>
    </v-data-table>
  </v-card>
</template>

<script>
import { userInfo } from 'os';

export default {
 
  data(){
    return{
      headers : [
        {text : '아이디', value: 'id'},
        {text : '도메인', value: 'domain'},
        {text : '로그내용', value: 'log'},
        {text : '접속시간', value: 'time'},
      ],
      userInfo : [
      {id : 'test1@google.com', domain : 'google', log : 'describe article' , time : '2019-07-09'},
      {id : 'test2@google.com', domain : 'google', log : 'describe article' , time : '2019-07-09'},
      {id : 'test3@google.com', domain : 'google', log : 'describe article' , time : '2019-07-09'},
      {id : 'test4@google.com', domain : 'google', log : 'describe article' , time : '2019-07-09'},
      {id : 'test5@google.com', domain : 'google', log : 'describe article' , time : '2019-07-09'},
      {id : 'test6@google.com', domain : 'google', log : 'describe article' , time : '2019-07-09'},
       ]
     }
  }
}
</script>
