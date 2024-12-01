//
//  AppDelegate.swift
//  macOS (App)
//
//  Created by Kyle Nazario on 5/31/23.
//

import Cocoa
import SwiftUI
import NZSSystemExtensions

class AppDelegate: NSObject, NSApplicationDelegate {
    
    private var window: NSWindow!

    func applicationDidFinishLaunching(_ notification: Notification) {
        let contentRect = NSRect(x: 0, y: 0, width: 400, height: 400)
        let styleMask: NSWindow.StyleMask = [.miniaturizable, .closable, .resizable, .titled]
        let backing = NSWindow.BackingStoreType.buffered
        let deferVal = false
        window = NSWindow(contentRect: contentRect, styleMask: styleMask, backing: backing, defer: deferVal)
        window.center()
        window.makeKeyAndOrderFront(nil)
        
        window.contentView = NSHostingView(rootView: AppView().frame(width: MAC_WINDOW_SIZE, height: MAC_WINDOW_SIZE))
        
        initAppMenu()
    }
    
    private func initAppMenu() {
        let mainMenu = NSMenu()
        NSApp.mainMenu = mainMenu
        
        let appMenuItem = NSMenuItem()
        mainMenu.addItem(appMenuItem)
        let appMenu = NSMenu()
        appMenuItem.submenu = appMenu
        appMenu.addItem(withTitle:"About \(APP_NAME)", action:#selector(openAboutPanel), keyEquivalent: "")
        appMenu.addItem(NSMenuItem.separator())
        appMenu.addItem(withTitle:"Quit \(APP_NAME)", action:#selector(NSApplication.terminate), keyEquivalent: "q")
        
        let helpMenuItem = NSMenuItem()
        mainMenu.addItem(helpMenuItem)
        let helpMenu = NSMenu(title: "Help")
        helpMenuItem.submenu = helpMenu
        helpMenu.addItem(withTitle: "\(APP_NAME) Help", action: #selector(openHelpPage), keyEquivalent: "")
    }
    
    @objc
    private func openHelpPage() {
        let helpLink = URL(string: "https://www.nazariosoftware.com/2024/10/16/get-help-with-incogmeeto.html")!
        NSWorkspace.shared.open(helpLink)
    }
    
    @objc
    private func openAboutPanel() {
        AboutAppButton.openAboutPanel()
    }

    func applicationShouldTerminateAfterLastWindowClosed(_ sender: NSApplication) -> Bool {
        return true
    }

}
