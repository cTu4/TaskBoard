Ext.define('TaskBoard.view.BookList' ,{
    extend: 'Ext.grid.Panel',
    alias: 'widget.booklist',

    title: 'Библиотека',
    store: 'BookStore',

    initComponent: function() {
        this.columns = [
            {header: 'Название',  dataIndex: 'name',  flex: 1},
            {header: 'Автор',  dataIndex: 'author',  flex: 1},
            {header: 'Год', dataIndex: 'year', flex: 1}
        ];

        this.callParent(arguments);
    }
});