//
//  Views.swift
//  Incogmeeto (macOS)
//
//  Created by Kyle Nazario on 7/5/23.
//

import Foundation
import SwiftUI
import AppKit

struct AppIconView: View {
    private let size: CGFloat = 100
    let appIcon = NSImage(named: "AppIcon")!
    
    var body: some View {
        Image(nsImage: appIcon)
            .resizable()
            .frame(width: size, height: size)
    }
}
