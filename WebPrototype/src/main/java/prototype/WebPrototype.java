package prototype;

import org.springframework.boot.SpringApplication;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.context.annotation.Configuration;

@Configuration
@EnableAutoConfiguration
@ComponentScan
public class WebPrototype
{
	public static void main(String[] args)
	{
		SpringApplication.run(WebPrototype.class, args);
	}
}
