package com.demo.spring.beans;

import org.springframework.context.ApplicationContext;
import org.springframework.context.annotation.AnnotationConfigApplicationContext;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Import;
import org.springframework.context.annotation.Scope;

//Configuration 注解用于表明该类是Spring的容器，用Bean注解的方法是Spring容器中的一个实例
@Configuration
//Import 注解表明引用其它的Spring容器，类似于XML配置中的import
@Import({CustomerService.class})
public class SpringBeanConfiguration {
	@Bean(name="English")
	@Scope("singleton")
	public ISpringBean getAmerican(){
		return new SpringBean();
	}
	
	public static void main(String[] args){
		ApplicationContext context = new AnnotationConfigApplicationContext(SpringBeanConfiguration.class);
		//ApplicationContext xmlCtx = new ClassPathXmlApplicationContext("***.xml");
		
		//ISpringBean bean = (ISpringBean) context.getBean("English");
		//bean.greet();
		
		CustomerService custA = (CustomerService)context.getBean("customerService");
    	custA.setMessage("Message by custA");
    	
    	
    	//retrieve it again
    	CustomerService custB = (CustomerService)context.getBean("customerService");
    	custB.setMessage("Message by custB");
    	System.out.println("Message : " + custA.getMessage());
    	System.out.println("Message : " + custB.getMessage());
	}
}
