package com.santaellamorenofrancisco.Notea;
import android.os.Bundle;
import com.getcapacitor.BridgeActivity;
import com.codetrixstudio.capacitor.GoogleAuth.GoogleAuth;

public class MainActivity extends BridgeActivity {
	@Override
	public void onCreate(Bundle savedInstanceState){
		super.onCreate(savedInstanceState);

		//aqui los plugins no oficiales
		registerPlugin(GoogleAuth.class);
		
		

		//registerPlugin(StoragePlugin.class)
	}
}
