package prototype.controller;

import com.mongodb.BasicDBObject;

import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.context.web.SpringBootServletInitializer;
import org.springframework.context.ApplicationContext;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.context.annotation.AnnotationConfigApplicationContext;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.data.mongodb.core.MongoOperations;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.ResponseBody;
import prototype.beans.ConfigMongoDB;
import prototype.beans.PrototypeUserBean;


@Controller
@EnableAutoConfiguration
@ComponentScan
public class ControllerForUser extends SpringBootServletInitializer
{
	private ApplicationContext applContext;
	private MongoOperations mongoOps;

	public ControllerForUser()
	{
		this.applContext = new AnnotationConfigApplicationContext(ConfigMongoDB.class);
		this.mongoOps = (MongoOperations) applContext.getBean("mongoTemplate");
	}

	@RequestMapping(value =
	{ "", "/", "/index" }, method = RequestMethod.GET)
	public String renderFirstPage(Model model)
	{
		model.addAttribute("userbean", new PrototypeUserBean());
		return "index";
	}

	@RequestMapping(value = "/signup", method = RequestMethod.POST)
	@ResponseBody
	public PrototypeUserBean createNewUser(@RequestBody final PrototypeUserBean user)
			throws Exception
	{
		System.out.println("uname : " + user.uname);
		System.out.println("password : " + user.password);
		System.out.println("emailId : " + user.emailId);
		Query searchQry = new Query(Criteria.where("uname").is(user.uname));
		PrototypeUserBean tmpUsr = mongoOps.findOne(searchQry, PrototypeUserBean.class);

		if (tmpUsr != null)
		{
			throw new IllegalArgumentException(String.format("user already exist ", user.uname));
		}
		else
		{
			mongoOps.insert(user);
			tmpUsr = null;
			tmpUsr = mongoOps.findOne(searchQry, PrototypeUserBean.class);
			if (tmpUsr != null)
			{
				return tmpUsr;
			}
			else
			{
				throw new IllegalArgumentException(String.format("Problem in inserting userdata ",
						user.uname));

			}
		}
	}

	@RequestMapping(value = "/home/{uname}", method = RequestMethod.GET)
	public String renderPrototypePage(@PathVariable String uname, Model model)
	{
		Query searchQry = new Query(Criteria.where("uname").is(uname));
		PrototypeUserBean user = mongoOps.findOne(searchQry, PrototypeUserBean.class);
		System.out.println(user.toString());
		model.addAttribute("user", user);
		return "web_prototype";
	}

	@RequestMapping(value = "/welcome", method = RequestMethod.GET)
	public String renderSignupSuccess(Model model)
	{
		return "welcome";
	}

	@RequestMapping(value = "/login", method = RequestMethod.POST)
	public @ResponseBody String Login(@RequestBody final PrototypeUserBean user) throws Exception
	{
		BasicDBObject qry = new BasicDBObject("uname", user.uname)
				.append("password", user.password);
		System.out.println("User name : " + user.uname);
		System.out.println("Password : " + user.password);
		Query searchQry = new Query(Criteria.where("_id").is(user.uname).and("password")
				.is(user.password));
		PrototypeUserBean tmpUsr = mongoOps.findOne(searchQry, PrototypeUserBean.class);
		System.out.println("USER LOGGED IN : " + tmpUsr);

		if (null != tmpUsr)
		{
			String successResponse = tmpUsr.toString();
			return "{\"success\":\"true\"," + successResponse + "}";
		}
		else
		{
			return "{\"success\":\"false\"}";
		}
	}

}
