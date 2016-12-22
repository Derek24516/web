package com.demo.thinkinjava.generics;

import java.util.HashSet;
import java.util.Iterator;
import java.util.LinkedList;
import java.util.Set;


/**
 * 一个简单的HashMap实现(链地址法)
 *
 * 
 * @author	    余冬冬
 * @data 	 2016年11月23日
 * @version	 v0.1.0
 * 
 */
public class LinkedAdressHashMap<K,V> {

	public static class Entry<K,V>{
		private K key ;
		private V value;
		
		public K getKey() {
			return key;
		}
		public void setKey(K key) {
			this.key = key;
		}
		public V getValue() {
			return value;
		}
		public void setValue(V value) {
			this.value = value;
		}
		
		public Entry(K key , V value) {
			this.key = key;
			this.value = value;
		}
		
		@Override
		public String toString() {
			return "k=" + key + ",v=" + value;
		}
		
	}
	
	//Hash的大小
	public static final int SIZE = 997;
	
	
	@SuppressWarnings("unchecked")
	LinkedList<Entry<K, V>>[] pairs = new LinkedList[SIZE];
	
	public V get(K key){
		int index = key.hashCode() % SIZE;
		LinkedList<Entry<K, V>> pairList = pairs[index];
		if(null == pairList || pairList.size() == 0){
			return null;
		}else{
			for (Entry<K, V> entry : pairList) {
				K curKey = entry.getKey();
				if(curKey.equals(key)){
					return entry.getValue();
				}
			}
		}
		
		return null;
	}
	
	public boolean put(K key,V value){
		int index = key.hashCode() % SIZE;
		LinkedList<Entry<K, V>> pairList = pairs[index];
		
		if(null == pairList || pairList.size() == 0){
			pairList = new LinkedList<LinkedAdressHashMap.Entry<K,V>>();
			pairList.add(new Entry<K, V>(key, value));
			pairs[index] = pairList;
			return true;
		}else{
			boolean keyFoundedFlag = false;
			for (Entry<K, V> entry : pairList) {
				K curKey = entry.getKey();
				
				if(key.equals(curKey)){
					entry.setValue(value);
					keyFoundedFlag = true;
				}
				
			}
			if(!keyFoundedFlag){
				pairList.add(new Entry<K, V>(key, value));
			}
			return true;
		}
		
	}
	
	public Set<Entry<K, V>> entrySet(){
		Set<Entry<K, V>> entrySet = new HashSet<Entry<K,V>>();
		for (LinkedList<Entry<K, V>> pairList : pairs) {
			if(pairList == null || pairList.size() == 0){
				continue;
			}
			for (Entry<K, V> entry : pairList) {
				entrySet.add(entry);
			}
		}
		
		return entrySet;
	}
	
	
	public static void main(String[] args) {
		LinkedAdressHashMap<String, String> map = new LinkedAdressHashMap<String, String>();
		map.put("1", "p1");
		map.put("2", "p2");
		map.put("2", "p2");
		map.put("2", "p2");
		
		Set<Entry<String, String>> entrySet = map.entrySet();
		Iterator<Entry<String, String>> iterator = entrySet.iterator();
		while (iterator.hasNext()) {
			Entry<String, String> e = iterator.next();
			System.out.println(e);
		}
	}
}
