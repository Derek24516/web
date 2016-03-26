package com.DesignMode.behavior.mediator;

public class Mediator extends AbstractMediator {

	@Override
	public void execute(String name, String method) {
		if ("self".equals(method)) { 
			// 各自做好分内事
			if ("ColleagueA".equals(name)) {
				ColleagueA colleague = (ColleagueA) super.colleagues.get("ColleagueA");
				colleague.self();
			} else {
				ColleagueB colleague = (ColleagueB) super.colleagues.get("ColleagueB");
				colleague.self();
			}
		} else { 
			// 与其他同事合作
			if ("ColleagueA".equals(name)) {
				ColleagueA colleague = (ColleagueA) super.colleagues.get("ColleagueA");
				colleague.out();
			} else {
				ColleagueB colleague = (ColleagueB) super.colleagues.get("ColleagueB");
				colleague.out();
			}
		}
		
	}
}
