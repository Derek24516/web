package com.demo.temp;

import com.rsslibj.elements.Channel;

public class RssTest {

	public static void main(String[] args) throws InstantiationException,
			IllegalAccessException, ClassNotFoundException {
		Channel channel = new Channel();
		channel.setDescription("This is my sample channel.");
		channel.setLink("http://localhost/");
		channel.setTitle("My Channel");
		channel.setImage("http://localhost/", "The Channel Image",
				"http://localhost/foo.jpg");
		channel.setTextInput("http://localhost/search",
				"Search The Channel Image", "The Channel Image", "s");
		channel.addItem("http://localhost/item1",
				"The First Item covers details on the first item>",
				"The First Item").setDcContributor("Joseph B. Ottinger");
		channel.addItem("http://localhost/item2",
				"The Second Item covers details on the second item",
				"The Second Item").setDcCreator("Jason Bell");
		System.out.println("The feed in RDF: " + channel.getFeed("rss"));
	}

}
