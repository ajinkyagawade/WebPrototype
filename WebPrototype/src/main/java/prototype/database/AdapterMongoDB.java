package prototype.database;

import org.springframework.context.ApplicationContext;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.MongoOperations;
import org.springframework.data.mongodb.core.query.Criteria;
import prototype.beans.PrototypeUserBean;

public class AdapterMongoDB
{
	private ApplicationContext ctx;
	private MongoOperations mongoOps;

	public AdapterMongoDB()
	{
		this.mongoOps = (MongoOperations) ctx.getBean("mongoTemplate");
	}

	public PrototypeUserBean getUser(String userId)
	{
		Query searchQry = new Query(Criteria.where("_id").is(userId));
		PrototypeUserBean usr = mongoOps.findOne(searchQry, PrototypeUserBean.class);
		return usr;
	}

}