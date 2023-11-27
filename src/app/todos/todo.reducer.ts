import { createReducer, on } from "@ngrx/store";
import { Todo } from "./models/todo.model";
import { borrar, crear, editar, limpiarCompletados, toggle, toggleAll } from "./todo.actions";

export const estadoInicial:Todo[]=[
  new Todo('salvar el mundo'),
  new Todo('vencer a Thanos'),
  new Todo('comprar traje de Ironman'),
  new Todo('robar escudo del Capitan America'),
]

const _todoReducer = createReducer(
    estadoInicial,
    on(crear, (state, {texto}) => [...state,new Todo(texto)]),

    on(borrar, (state, {id})=>state.filter( todo=> todo.id!==id)),

    on(toggleAll, (state, {completado}) =>{ 
      return state.map(todo=>{
        
          return{
            ...todo,
            completado: completado
          }
         
      })
    }),
    on(toggle, (state, {id}) =>{ 
      return state.map(todo=>{
        if(todo.id===id){
          return{
            ...todo,
            completado: !todo.completado
          }
        } else{
          return todo
        }
      })
    }),
    on(editar, (state, {id, texto}) =>{
      return state.map(todo=>{
        if(todo.id===id){
          return{
            ...todo,
            texto:texto 
          }
        } else{
          return todo
        }
      })
    }),
    on(limpiarCompletados, (state) =>{
      return state.filter(todo=>!todo.completado)
    }),


  ); 
  

  export function todoReducer( state:any, action:any){
    return _todoReducer (state, action )
  }