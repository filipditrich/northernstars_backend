module.exports = {

    user: {
        roles: {
            set: {
                PLAYER: { key: 'p', value: 'player' },
                ADMIN: { key: 'a', value: 'admin '}
            },
            list: ['player', 'admin'],
            default: { key: 'p', value: 'player' }
        }
    }

};