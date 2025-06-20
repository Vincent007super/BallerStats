<?php
require_once 'config.php';

try {
    $stats = [];
    
    // Get total games
    $sql = "SELECT COUNT(*) as games FROM games";
    $stmt = $conn->query($sql);
    $games = $stmt->fetch(PDO::FETCH_ASSOC);
    $stats[] = ['label' => 'Games', 'value' => $games['games']];
    
    // Get win rate based on actual games table structure
    $sql = "SELECT 
        ROUND((COUNT(CASE WHEN team_score > opponent_score THEN 1 END) * 100.0 / COUNT(*)), 1) as win_rate 
        FROM games WHERE team_score IS NOT NULL AND opponent_score IS NOT NULL";
    $stmt = $conn->query($sql);
    $winRate = $stmt->fetch(PDO::FETCH_ASSOC);
    $stats[] = ['label' => 'Win Rate', 'value' => ($winRate['win_rate'] ?? 0) . '%'];
    
    // Get average points
    $sql = "SELECT ROUND(AVG(team_score), 1) as avg_points FROM games WHERE team_score IS NOT NULL";
    $stmt = $conn->query($sql);
    $avgPoints = $stmt->fetch(PDO::FETCH_ASSOC);
    $stats[] = ['label' => 'Avg Points', 'value' => $avgPoints['avg_points'] ?? 0];
    
    // Get total players
    $sql = "SELECT COUNT(*) as players FROM players";
    $stmt = $conn->query($sql);
    $players = $stmt->fetch(PDO::FETCH_ASSOC);
    $stats[] = ['label' => 'Players', 'value' => $players['players']];
    
    // Get total coaches
    $sql = "SELECT COUNT(*) as coaches FROM coaches";
    $stmt = $conn->query($sql);
    $coaches = $stmt->fetch(PDO::FETCH_ASSOC);
    $stats[] = ['label' => 'Coaches', 'value' => $coaches['coaches']];
    
    echo json_encode(['stats' => $stats]);
    
} catch(PDOException $e) {
    echo json_encode(['error' => $e->getMessage()]);
}
?>