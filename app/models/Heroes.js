exports.definition = {
	config: {
		adapter: {
			type: "properties",
			collection_name: "Heroes"
		}
	},
	extendModel: function(Model) {
		_.extend(Model.prototype, {
      transform: function transform() {
        var transformed = this.toJSON();
        return transformed;
      }
		});

		return Model;
	},
	extendCollection: function(Collection) {
		_.extend(Collection.prototype, {
      comparator: function(item) {
        var objComp = item.get('name');
        return objComp[Ti.Locale.currentLanguage];
      }
		});

		return Collection;
	}
};