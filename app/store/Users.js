Ext.define('TaskBoard.store.Users', {
    extend: 'Ext.data.Store',
    storeId:'store_users',
    alias: 'store.users',
    fields: ['id','number','task','name','surname','status','important','date'],
    sorters: [
        {
        property: 'name',
        direction: 'ASC'
    }, {
        property: 'surname',
        direction: 'ASC'
    },
        {
            property: 'important',
            direction: 'ASC'
        }
        ],
    data: [
        {
        id: 1,
        number: 'TSK-1200',
        task: 'Create car',
        name: 'John',
        surname: 'Brawn',
        status: 'Plan',
        important: 0,
        date: '22.11.2020'
        },
        {
        id: 2,
        number: 'TSK-1201',
        task: 'Create tree',
        name: 'Ann',
        surname: 'Creaty',
        status: 'In progress',
        important: 1,
        date: '07.09.2020'
        },
        {
            id: 3,
            number: 'TSK-1203',
            task: 'Create TaskBoard',
            name: 'Alex',
            surname: 'Medvedev',
            status: 'Testing',
            important: 2,
            date: '22.09.2020'
        },
        {
            id: 4,
            number: 'TSK-1204',
            task: 'Create controller',
            name: 'Jane',
            surname: 'Kook',
            status: 'Done',
            important: 0,
            date: '02.10.2020'
        },
        {
            id: 5,
            number: 'TSK-1205',
            task: 'Create car',
            name: 'Alex',
            surname: 'Aleshin',
            status: 'Plan',
            important: 0,
            date: '22.11.2020'
        },
        {
            id: 6,
            number: 'TSK-1206',
            task: 'Create car',
            name: 'John',
            surname: 'Brawn',
            status: 'Testing',
            important: 0,
            date: '22.11.2020'
        },
        {
            id: 7,
            number: 'TSK-1207',
            task: 'Create car',
            name: 'John',
            surname: 'Brawn',
            status: 'In progress',
            important: 2,
            date: '22.11.2020'
        },
        {
            id: 8,
            number: 'TSK-1208',
            task: 'Create car',
            name: 'John',
            surname: 'Brawn',
            status: 'Plan',
            important: 2,
            date: '22.11.2020'
        },
        {
            id: 9,
            number: 'TSK-1209',
            task: 'Create car',
            name: 'Alex',
            surname: 'Aleshin',
            status: 'In progress',
            important: 0,
            date: '22.11.2020'
        },
        {
            id: 10,
            number: 'TSK-1210',
            task: 'Create car',
            name: 'Alex',
            surname: 'Aleshin',
            status: 'Testing',
            important: 2,
            date: '22.11.2020'
        },
        {
            id: 11,
            number: 'TSK-1211',
            task: 'Create car',
            name: 'Alex',
            surname: 'Aleshin',
            status: 'Testing',
            important: 0,
            date: '22.11.2020'
        },
        {
            id: 12,
            number: 'TSK-1212',
            task: 'Create car',
            name: 'Alex',
            surname: 'Aleshin',
            status: 'Testing',
            important: 2,
            date: '22.11.2020'
        },
        {
            id: 13,
            number: 'TSK-1213',
            task: 'Create car',
            name: 'Alex',
            surname: 'Aleshin',
            status: 'Testing',
            important: 1,
            date: '22.11.2020'
        }]
});