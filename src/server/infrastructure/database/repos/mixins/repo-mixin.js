import omit from 'lodash/omit';

export default function RepoMixin(model) {
    return {
        create(value) {
            const Model = this[model];

            return (new Model(value)).saveAsync();
        },

        createOrUpdate(value) {
            const Model = this[model];

            if (value._id) {
                return Model.updateAsync(
                    {
                        _id: value._id
                    },
                    omit(value, '_id'),
                    {
                        upsert: true,
                        setDefaultsOnInsert: true
                    });
            }

            return this.create(value);
        },

        findById(id, options) {
            return this[model].findByIdAsync(id, null, options);
        },

        findOne(query, options) {
            return this[model].findOneAsync(query, null, options);
        },

        find(query, options) {
            return this[model].findAsync(query, null, options);
        }
    };
}
