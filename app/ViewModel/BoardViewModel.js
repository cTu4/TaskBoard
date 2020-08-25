Ext.define('TaskBoard.ViewModel.BoardViewModel',{
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.BoardViewModel',

    stores:{
      Users:{
          type:'users'
      }
    },
    formulas:{
      board_data(get){
          let store = get('Users').getData().items;
          let data = [];
          data['plan']=[];
          data['progress'] = [];
          data['test']=[];
          data['done'] = [];
          store.forEach(function (item){
              switch (item.data.status){
                  case 'Plan':
                      data['plan'].push(item);
                      break;
                  case 'In progress':
                      data['progress'].push(item);
                      break;
                  case 'Testing':
                      data['test'].push(item);
                      break;
                  case 'Done':
                      data['done'].push(item);
                      break;
              }
          });
          return data;
      },
        card_data(get){
            let store = get('Users');
            return store;
        }
    }
});