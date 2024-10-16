//
//  Views.swift
//  Beet Engine
//
//  Created by tester on 7/5/23.
//

import Foundation
import SwiftUI
import AppKit
typealias PlatformImage = NSImage

struct AppIconView: View {
    private let size: CGFloat = 100
    let appIcon = PlatformImage(named: "AppIcon")!
    
    var body: some View {
        image
            .resizable()
            .frame(width: size, height: size)
    }
    
    private var image: Image {
        return Image(nsImage: appIcon)
    }
}
