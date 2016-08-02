var Cloud = require("ti.cloud");
var Q = require("q");

// PUBLIC METHODS
exports.queryObject = queryObject;

function queryObject(options){
	
	var objClass = options.objClass;
	var objId = options.objId;
	var refDate = options.refDate;
	Ti.API.debug('[REPOSITORY][REF DATE] '+refDate);
	
	var queryPromise = Q.Promise(function(resolve,reject){
		var queryObj = {
			classname: objClass,
			page: 1,
			per_page: 9999,
			where: {}
		};

		if(objId != null)
			 queryObj.where["_id"] = objId;

		if(refDate != null)
			queryObj.where["updated_at"] = {"$gt": refDate};

		Cloud.Objects.query(queryObj, function (e) {
		  Ti.API.debug('[REPOSITORY][CLOUD QUERY RESULT] '+ e.Heroes.length);
			if (e.success) {
				resolve(e);
			} else {
				reject(e);
			}
		});
		
	});
	
	return queryPromise;
}
