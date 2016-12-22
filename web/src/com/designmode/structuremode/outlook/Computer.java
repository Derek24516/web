package com.designmode.structuremode.outlook;

public class Computer {
	private CPU cpu;
	private Memory memory;
	private Disk disk;
	
	public Computer() {
		this.cpu = new CPU();
		this.memory = new Memory();
		this.disk = new Disk();
	}
	
	public void stratup(){
		System.out.println("Computer startup !");
		cpu.startup();
		memory.startup();
		disk.startup();
		System.out.println("Start computer finished");
	}
}
