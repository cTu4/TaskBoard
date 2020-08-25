Ext.define('TaskBoard.ViewModel.TaskModel',{
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.TaskModel',
    formulas:{
        important_text(get){
            let imp = get('important');
            let text='';
            switch (imp){
                case 0:
                    text='Must';
                    break;
                case 1:
                    text='Should';
                    break;
                case 2:
                    text='Could';
                    break;
            }
            return text;
        }
    },
    data:{
        id: 1,
        number: 'TSK-1200',
        task: 'Create car',
        name: 'John',
        surname: 'Brawn',
        status: 'PLAN',
        important: 0,
        date: '22.11.2020',
        color: '#f43343'
    }
});