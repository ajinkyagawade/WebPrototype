package prototype;

import java.io.InputStream;
import java.util.Properties;
import java.io.FileInputStream;
import java.io.IOException;

public class Config
{
	private static Properties configProperties;

	private static Properties readPropertyFile() throws IOException
	{
		Properties myProperties = new Properties();
		String userDir = System.getProperty("user.dir");
		InputStream inputProperties = new FileInputStream(userDir + "/PrototypeConfig.properties");
		myProperties.load(inputProperties);
		return myProperties;
	}

	public static Properties getProperties()
	{
		if (null == configProperties)
		{
			try
			{
				configProperties = readPropertyFile();
			}
			catch (IOException e)
			{
				System.out.println("Can't read properties file");
			}
		}
		return configProperties;
	}

}
