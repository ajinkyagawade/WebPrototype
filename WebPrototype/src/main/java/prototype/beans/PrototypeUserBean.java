package prototype.beans;

import java.io.Serializable;

import javax.validation.constraints.Size;

import org.hibernate.validator.constraints.NotBlank;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "users")
public class PrototypeUserBean implements Serializable
{
	
	@NotBlank
	@Size(max = 64)
	@Id
	public String uname;

	@Size(max = 64)
	public String password;

	@NotBlank
	@Size(max = 64)
	public String emailId;

	public void setUname(String uname)
	{
		this.uname = uname;
	}

	public String getUname()
	{
		return this.uname;
	}

	public void setPassword(String password)
	{
		this.password = password;
	}

	public String getPassword()
	{
		return this.password;
	}

	public void setEmailId(String emailId)
	{
		this.emailId = emailId;
	}

	public String getEmailId()
	{
		return this.emailId;
	}

	@Override
	public String toString()
	{
		return "\"username\":\"" + uname + "\"," + "\"email\":\"" + emailId
				+ "\"";
	}

}
