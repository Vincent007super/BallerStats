<?php
require_once '../config.php';
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');

try {
    // Get player statistics based on actual database structure
    $sql = "SELECT p.id, p.name, p.jersey_number, p.position, 
            AVG(ps.points) as avg_points, 
            AVG(ps.assists) as avg_assists,
            AVG(ps.rebounds) as avg_rebounds,
            AVG(ps.steals) as avg_steals,
            AVG(ps.blocks) as avg_blocks,
            AVG(ps.field_goals_made) as avg_fg_made,
            AVG(ps.field_goals_attempted) as avg_fg_attempted,
            AVG(ps.three_pointers_made) as avg_3p_made,
            AVG(ps.three_pointers_attempted) as avg_3p_attempted,
            AVG(ps.free_throws_made) as avg_ft_made,
            AVG(ps.free_throws_attempted) as avg_ft_attempted,
            CASE 
                WHEN AVG(ps.field_goals_attempted) > 0 
                THEN ROUND((AVG(ps.field_goals_made) / AVG(ps.field_goals_attempted)) * 100, 1)
                ELSE 0 
            END as avg_fg_percentage,
            CASE 
                WHEN AVG(ps.three_pointers_attempted) > 0 
                THEN ROUND((AVG(ps.three_pointers_made) / AVG(ps.three_pointers_attempted)) * 100, 1)
                ELSE 0 
            END as avg_3p_percentage,
            CASE 
                WHEN AVG(ps.free_throws_attempted) > 0 
                THEN ROUND((AVG(ps.free_throws_made) / AVG(ps.free_throws_attempted)) * 100, 1)
                ELSE 0 
            END as avg_ft_percentage,
            COUNT(ps.id) as games_played
            FROM players p
            LEFT JOIN player_stats ps ON p.id = ps.player_id
            GROUP BY p.id, p.name, p.jersey_number, p.position
            ORDER BY p.name";
            
    $stmt = $conn->prepare($sql);
    $stmt->execute();
    $stats = $stmt->fetchAll(PDO::FETCH_ASSOC);
    
    echo json_encode(['success' => true, 'data' => $stats]);
} catch(PDOException $e) {
    echo json_encode(['success' => false, 'error' => $e->getMessage()]);
}
?>